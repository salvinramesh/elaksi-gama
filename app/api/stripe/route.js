// app/api/stripe/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Stripe webhook handler (safe for Next.js build).
 *
 * Important: we do NOT instantiate Stripe at module level.
 * We create the Stripe client inside the handler so a missing env var
 * won't break the Next.js build step.
 *
 * Make sure STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET are set in production
 * if you intend to use this route.
 */

export const config = {
  // We need raw body to verify Stripe signature
  api: { bodyParser: false },
};

export async function POST(request) {
  // Lazy import Stripe only when needed (inside request)
  let Stripe;
  try {
    // Dynamically import to avoid side-effects at module load time
    Stripe = (await import("stripe")).default;
  } catch (err) {
    console.error("Unable to import stripe package:", err);
    return NextResponse.json({ error: "Stripe package not available" }, { status: 500 });
  }

  // Ensure secret key exists
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecret) {
    console.warn("STRIPE_SECRET_KEY is not configured; returning 501 from stripe webhook route.");
    return NextResponse.json({ error: "Stripe not configured on server" }, { status: 501 });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: "2022-11-15" });

  try {
    // Read raw body as text for signature verification
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");
    if (!sig || !stripeWebhookSecret) {
      console.error("Missing stripe-signature header or STRIPE_WEBHOOK_SECRET env.");
      return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, stripeWebhookSecret);
    } catch (err) {
      console.error("Stripe webhook signature verification failed:", err.message || err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Helper to mark or delete orders (keeps your original behavior)
    const handlePaymentIntent = async (paymentIntentId, isPaid) => {
      // list checkout sessions that use this payment intent
      const session = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
        limit: 1,
      });

      if (!session || !session.data || !session.data[0]) {
        console.warn("No checkout session found for payment intent:", paymentIntentId);
        return;
      }

      const { orderIds, userId, appId } = session.data[0].metadata || {};

      if (appId !== "gocart") {
        console.warn("Invalid app id on stripe webhook metadata:", appId);
        return;
      }

      if (!orderIds) {
        console.warn("No orderIds metadata present on session for payment_intent:", paymentIntentId);
        return;
      }

      const orderIdsArray = orderIds.split(",");

      if (isPaid) {
        // mark order as paid
        await Promise.all(
          orderIdsArray.map(async (orderId) => {
            await prisma.order.update({
              where: { id: orderId },
              data: { isPaid: true },
            });
          })
        );

        // clear cart from user
        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: { cart: {} },
          });
        }
      } else {
        // delete order from db
        await Promise.all(
          orderIdsArray.map(async (orderId) => {
            try {
              await prisma.order.delete({ where: { id: orderId } });
            } catch (err) {
              console.warn("Failed to delete order", orderId, err.message || err);
            }
          })
        );
      }
    };

    // Handle the event types you care about
    switch (event.type) {
      case "payment_intent.succeeded": {
        await handlePaymentIntent(event.data.object.id, true);
        break;
      }
      case "payment_intent.canceled": {
        await handlePaymentIntent(event.data.object.id, false);
        break;
      }
      default:
        console.log("Unhandled Stripe event type:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook handler error:", error);
    return NextResponse.json({ error: error?.message || "Webhook handler error" }, { status: 500 });
  }
}
