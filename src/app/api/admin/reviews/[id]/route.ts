import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const data = await request.json();

        const review = await prisma.review.update({
            where: { id },
            data,
        });

        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ message: "Gagal mengupdate ulasan" }, { status: 500 });
    }
}
