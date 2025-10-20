// app/api/address/route.js (POST portion - full file below if you want)
import prisma from "@/lib/prisma";
import { getAuth, clerkClient } from "@clerk/nextjs/server"; // <- note clerkClient import
import { NextResponse } from "next/server";

function normalizeAddressPayload(body) {
  const input = body && body.address ? body.address : body || {};
  const street = input.street || input.address1 || input.addressLine1 || input.line1 || "";
  const street2 = input.address2 || input.addressLine2 || input.line2 || "";
  const city = input.city || input.town || "";
  const state = input.state || input.region || input.district || "";
  const zip = input.zip || input.pincode || input.postalCode || input.postal_code || "";
  const country = input.country || input.countryCode || "India";
  const name = input.name || input.fullName || "";
  const email = input.email || input.emailAddress || "";
  const phone = input.phone || input.mobile || input.contact || "";

  return {
    name: String(name).trim(),
    email: String(email).trim(),
    street: String(street).trim(),
    street2: String(street2).trim(),
    city: String(city).trim(),
    state: String(state).trim(),
    zip: String(zip).trim(),
    country: String(country).trim(),
    phone: String(phone).trim(),
  };
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ ok: false, error: "Invalid JSON body", detail: e.message }, { status: 400 });
    }

    // get clerk auth
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ ok: false, error: "Unauthenticated - sign in required" }, { status: 401 });
    }

    // fetch Clerk user profile to get name/email (if any)
    let clerkUser = null;
    try {
      clerkUser = await clerkClient.users.getUser(userId);
    } catch (clerkErr) {
      // not fatal: we'll still proceed using whatever was provided in payload
      console.warn("[/api/address] clerkClient.getUser failed:", clerkErr?.message || clerkErr);
    }

    // ensure a corresponding row exists in your User table
    // use upsert: if user row missing create it with email/name/image; otherwise leave as-is
    try {
      const createData = {
        id: userId,
        name: clerkUser?.fullName || body?.address?.name || body?.name || "Customer",
        email: (clerkUser?.emailAddresses && clerkUser.emailAddresses[0]?.emailAddress) || body?.address?.email || body?.email || "",
        image: clerkUser?.imageUrl || "",
        // cart default value is JSON in prisma schema; omit to use default
      };

      // important: do not upsert if email missing? you may still want a record
      await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: createData,
      });
    } catch (upsertErr) {
      console.error("[/api/address] prisma.user.upsert error:", upsertErr);
      // If upsert fails due to missing required fields in schema, surface helpful message
      return NextResponse.json({ ok: false, error: "Failed to ensure user record", detail: upsertErr.message }, { status: 500 });
    }

    // normalize address payload and validate required fields
    const addr = normalizeAddressPayload(body);
    const required = ["name", "email", "street", "city", "zip", "phone"];
    const missing = required.filter((k) => !addr[k] || addr[k].length === 0);
    if (missing.length) {
      return NextResponse.json({ ok: false, error: "Missing required fields", missing, received: addr }, { status: 400 });
    }

    // prepare data for prisma create
    const data = {
      userId,
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
