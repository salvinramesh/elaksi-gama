import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { PaymentMethod } from "@prisma/client";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";

export async function POST(request) {
  try {
    const { userId, has } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }

    const { addressId, items, couponCode, paymentMethod } = await request.json();

    // Validate request
    if (
      !addressId ||
      !paymentMethod ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "missing order details." },
        { status: 401 }
      );
    }

    let coupon = null;

    if (couponCode) {
      coupon = await prisma.coupon.findUnique({
        where: { code: couponCode },
      });
      if (!coupon) {
        return NextResponse.json({ error: "Coupon not found" }, { status: 400 });
      }
    }

    // Coupon for new users check
    if (couponCode && coupon.forNewUser) {
      const userorders = await prisma.order.findMany({ where: { userId } });
      if (userorders.length > 0) {
        return NextResponse.json(
          { error: "Coupon valid for new users" },
          { status: 400 }
        );
      }
    }

    const isPlusMember = has({ plan: "plus" });

    // Coupon for members check
    if (couponCode && coupon.forMember) {
      if (!isPlusMember) {
        return NextResponse.json(
          { error: "Coupon valid for members only" },
          { status: 400 }
        );
      }
    }

    // Group orders by storeId
    const ordersByStore = new Map();

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
      });
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
      }
      const storeId = product.storeId;
      if (!ordersByStore.has(storeId)) {
        ordersByStore.set(storeId, []);
      }
      ordersByStore.get(storeId).push({ ...item, price: product.price });
    }

    let orderIds = [];
    let fullAmount = 0;
    let isShippingFeeAdded = false;

    // Create orders for each seller
    for (const [storeId, sellerItems] of ordersByStore.entries()) {
      let total = sellerItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      if (couponCode) {
        total -= (total * coupon.discount) / 100;
      }

      if (!isPlusMember && !isShippingFeeAdded) {
        total += 5;
        isShippingFeeAdded = true;
      }

      // Round to two decimals and accumulate
      const rounded = parseFloat(total.toFixed(2));
      fullAmount += rounded;

      const order = await prisma.order.create({
        data: {
          userId,
          storeId,
          addressId,
          total: rounded,
          paymentMethod,
          isCouponUsed: !!coupon,
          coupon: coupon ? coupon : {},
          orderItems: {
            create: sellerItems.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });
      orderIds.push(order.id);
    }

    // ⚡ RAZORPAY INTEGRATION
    if (paymentMethod === "RAZORPAY" || paymentMethod === PaymentMethod?.RAZORPAY) {
      // Sanity logging
      console.log("Creating Razorpay order for user:", userId, "dbOrderIds:", orderIds);

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      // ensure amount is in paise
      const amountInPaise = Math.round(fullAmount * 100);

      const options = {
        amount: amountInPaise,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        notes: {
          orderIds: orderIds.join(","),
          userId,
        },
      };

      const rpOrder = await razorpay.orders.create(options);

      console.log("Razorpay order created:", rpOrder && rpOrder.id);

      // Persist the razorpay order id on all DB orders created in this request
      // NOTE: your prisma schema must NOT have @unique on razorpayOrderId
      await prisma.order.updateMany({
        where: { id: { in: orderIds } },
        data: { razorpayOrderId: rpOrder.id },
      });

      return NextResponse.json({
        id: rpOrder.id,
        currency: rpOrder.currency,
        amount: rpOrder.amount,
        key: process.env.RAZORPAY_KEY_ID,
      });
    }

    // For COD — clear cart directly and return success
    await prisma.user.update({
      where: { id: userId },
      data: { cart: {} },
    });

    return NextResponse.json({ message: "Orders Placed Successfully" });
  } catch (error) {
    console.error("Orders POST error:", error);
    return NextResponse.json(
      { error: error?.code || error?.message || String(error) },
      { status: 400 }
    );
  }
}

// ✅ Get all orders for a user
export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const orders = await prisma.order.findMany({
      where: {
        userId,
        OR: [
          { paymentMethod: PaymentMethod.COD },
          { AND: [{ paymentMethod: PaymentMethod.RAZORPAY }, { isPaid: true }] },
        ],
      },
      include: {
        orderItems: { include: { product: true } },
        address: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
