import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const data = await request.json();

        const product = await prisma.product.update({
            where: { id },
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
        console.error("Update Product Error:", error);
        return NextResponse.json({ message: "Gagal mengupdate produk" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        await prisma.product.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Produk dihapus" });
    } catch (_error) {
        return NextResponse.json({ message: "Gagal menghapus produk" }, { status: 500 });
    }
}
