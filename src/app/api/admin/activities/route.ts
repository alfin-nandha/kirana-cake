import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const activity = await prisma.activity.create({
            data: {
                title: data.title,
                description: data.description,
                images: data.images ? JSON.stringify(data.images) : JSON.stringify([]),
                date: data.date ? new Date(data.date) : new Date(),
                ctaText: data.ctaText || "Selengkapnya",
                ctaUrl: data.ctaUrl || "#",
                isHidden: data.isHidden || false,
            },
        });

        return NextResponse.json(activity);
    } catch (error) {
        console.error("Create Activity Error:", error);
        return NextResponse.json({ message: "Gagal membuat aktivitas" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const activities = await prisma.activity.findMany({
            orderBy: { date: "desc" },
        });
        return NextResponse.json(activities);
    } catch (_error) {
        return NextResponse.json({ message: "Gagal mengambil data", error: _error }, { status: 500 });
    }
}
