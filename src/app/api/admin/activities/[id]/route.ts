import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const data = await request.json();

        const activity = await prisma.activity.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                images: data.images ? JSON.stringify(data.images) : undefined,
                date: data.date ? new Date(data.date) : undefined,
                ctaText: data.ctaText,
                ctaUrl: data.ctaUrl,
                isHidden: data.isHidden,
            },
        });

        return NextResponse.json(activity);
    } catch (error) {
        console.error("Update Activity Error:", error);
        return NextResponse.json({ message: "Gagal mengupdate aktivitas" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        await prisma.activity.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Aktivitas dihapus" });
    } catch (_error) {
        return NextResponse.json({ message: "Gagal menghapus aktivitas" }, { status: 500 });
    }
}
