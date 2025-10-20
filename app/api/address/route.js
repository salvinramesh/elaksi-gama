// app/api/address/route.js
import prisma from "@/lib/prisma";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

function normalizeAddressPayload(body) {
  const input = body && body.address ? body.address : body || {};
  return {
    name: String(input.name || input.fullName || "").trim(),
    email: String(input.email || input.emailAddress || "").trim(),
    street: String(input.street || input.address1 || input.addressLine1 || input.line1 || "").trim(),
    street2: String(input.street2 || input.address2 || input.addressLine2 || input.line2 || "").trim(),
    city: String(input.city || input.town || "").trim(),
    state: String(input.state || input.region || input.district || "").trim(),
    zip: String(input.zip || input.pincode || input.postalCode || input.postal_code || "").trim(),
    country: String(input.country || input.countryCode || "India").trim(),
    phone: String(input.phone || input.mobile || input.contact || "").trim(),
  };
}

export async function POST(request) {
  try {
    // parse body safely
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ ok: false, error: "Invalid JSON body", detail: e.message }, { status: 400 });
    }

    // normalize
    const addr = normalizeAddressPayload(body);

    // Validate required address fields (you can relax this for guests if you prefer)
    const required = ["name", "email", "street", "city", "zip", "phone"];
    const missing = required.filter((k) => !addr[k] || addr[k].length === 0);
    if (missing.length) {
      return NextResponse.json({ ok: false, error: "Missing required fields", missing, received: addr }, { status: 400 });
    }

    // check auth
    const { userId } = getAuth(request);
    let finalUserId = null;

    if (userId) {
      finalUserId = userId;
      // attempt to fetch clerk user info (optional)
      let clerkUser = null;
      try {
        clerkUser = await clerkClient.users.getUser(userId);
      } catch (clerkErr) {
        console.warn("[/api/address] clerkClient.getUser failed (continuing):", clerkErr?.message || clerkErr);
      }

      // Ensure a corresponding row exists in your User table (upsert)
      try {
        await prisma.user.upsert({
          where: { id: userId },
          update: {},
          create: {
            id: userId,
            name: clerkUser?.fullName || addr.name || "Customer",
            email: (clerkUser?.emailAddresses && clerkUser.emailAddresses[0]?.emailAddress) || addr.email || "",
            image: clerkUser?.imageUrl || "",
          },
        });
      } catch (upsertErr) {
        console.error("[/api/address] prisma.user.upsert error:", upsertErr);
        // Don't allow a failing upsert to cause an FK violation later; return error
        return NextResponse.json({ ok: false, error: "Failed to ensure user record", detail: upsertErr.message }, { status: 500 });
      }
    } else {
      // No user — treat as guest. finalUserId remains null.
      console.log("[/api/address] Guest address submission - saving without userId");
    }

    // build address data
    const data = {
      userId: finalUserId, // either a string id or null
      name: addr.name,
      email: addr.email,
      street: addr.street + (addr.street2 ? `, ${addr.street2}` : ""),
      city: addr.city,
      state: addr.state || "",
      zip: addr.zip,
      country: addr.country || "India",
      phone: addr.phone,
    };

    // create address
    const newAddress = await prisma.address.create({ data });

    return NextResponse.json({ ok: true, newAddress, message: "Address added successfully" }, { status: 201 });
  } catch (err) {
    console.error("[/api/address] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: err.message || "Unknown error", stack: err.stack }, { status: 500 });
  }
}
