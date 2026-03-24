import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const product = await prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                category: data.category,
                description: data.description,
                isFeatured: data.isFeatured,
                isHidden: data.isHidden,
                images: JSON.stringify(data.images),
                variants: JSON.stringify(data.variants),
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Create Product Error:", error);
        return NextResponse.json({ message: "Gagal membuat produk" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { updatedAt: "desc" },
        });
        return NextResponse.json(products);
    } catch (_error) {
        return NextResponse.json({ message: "Gagal mengambil data", error: _error }, { status: 500 });
    }
}
