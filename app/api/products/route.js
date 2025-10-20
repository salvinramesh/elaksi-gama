import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") || "latest";
    const limit = parseInt(searchParams.get("limit") || (mode === "best" ? "8" : "4"), 10);

    let products;

    if (mode === "best") {
      // --- 🟧 Fetch Best Selling Products ---
      // Assumes there's an OrderItem or similar table with productId + quantity
      const bestSelling = await prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: limit,
      });

      const bestIds = bestSelling.map((p) => p.productId);

      products = await prisma.product.findMany({
        where: {
          id: { in: bestIds },
          inStock: true,
          store: { isActive: true },
        },
        include: {
          rating: {
            select: {
              createdAt: true,
              rating: true,
              review: true,
              user: { select: { name: true, image: true } },
            },
          },
          store: true,
        },
      });

      // Preserve the same order as the grouped result
      products.sort(
        (a, b) => bestIds.indexOf(a.id) - bestIds.indexOf(b.id)
      );

    } else {
      // --- 🟩 Fetch Latest Products ---
      products = await prisma.product.findMany({
        where: {
          inStock: true,
          store: { isActive: true },
        },
        include: {
          rating: {
            select: {
              createdAt: true,
              rating: true,
              review: true,
              user: { select: { name: true, image: true } },
            },
          },
          store: true,
        },
        orderBy: { createdAt: "desc" },
        take: limit,
      });
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error in /api/products:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
