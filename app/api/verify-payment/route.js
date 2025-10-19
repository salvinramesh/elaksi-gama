import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    // Recreate signature: HMAC_SHA256(order_id + '|' + payment_id, RAZORPAY_KEY_SECRET)
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_API_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest("hex");

    console.log("Verify payment", {
      razorpay_order_id,
      razorpay_payment_id,
      provided_signature: razorpay_signature,
      generated_signature,
    });

    if (generated_signature !== razorpay_signature) {
      console.error("Signature mismatch");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Mark matching orders as paid (multiple orders may share the same razorpayOrderId)
    const updateResult = await prisma.order.updateMany({
      where: {
        razorpayOrderId: razorpay_order_id,
        userId,
      },
      data: {
        isPaid: true,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    console.log("Orders updated count:", updateResult.count);

    // Clear the user's cart
    await prisma.user.update({
      where: { id: userId },
      data: { cart: {} },
    });

    return NextResponse.json({ success: true, message: "Payment verified", updated: updateResult.count });
  } catch (err) {
    console.error("verify-payment error:", err);
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
  }
}
