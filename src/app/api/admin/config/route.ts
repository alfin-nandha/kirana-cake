import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const config = await prisma.storeConfig.findUnique({
            where: { id: 1 },
        });
        return NextResponse.json(config);
    } catch (_error) {
        return NextResponse.json({ message: "Gagal mengambil data", error: _error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const data = await request.json();

        const config = await prisma.storeConfig.update({
            where: { id: 1 },
            data: {
                name: data.name,
                tagline: data.tagline,
                description: data.description,
                whatsappNumber: data.whatsappNumber,
                whatsappMessage: data.whatsappMessage,
                tokopediaUrl: data.tokopediaUrl,
                instagram: data.instagram,
                mapsUrl: data.mapsUrl,
                fullAddress: data.fullAddress,
                rating: data.rating,
                reviewCount: data.reviewCount,
                soldCount: data.soldCount,
                lat: data.lat,
                lng: data.lng,
                showHero: data.showHero,
                showStats: data.showStats,
                showProducts: data.showProducts,
                showNews: data.showNews,
                showAbout: data.showAbout,
                showReviews: data.showReviews,
                showContact: data.showContact,
            },
        });

        return NextResponse.json(config);
    } catch (error) {
        console.error("Update Config Error:", error);
        return NextResponse.json({ message: "Gagal mengupdate konfigurasi" }, { status: 500 });
    }
}
