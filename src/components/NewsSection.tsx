import prisma from "@/lib/prisma";
import NewsSectionClient from "./NewsSectionClient";

export default async function NewsSection() {
    const activities = await prisma.activity.findMany({
        where: { isHidden: false },
        orderBy: { date: 'desc' }
    });

    // Map Prisma models to the format expected by the client component
    const newsData = activities.map(item => ({
        id: item.id,
        title: item.title,
        date: item.date.toISOString(),
        description: item.description,
        images: item.images ? JSON.parse(item.images) : [],
        ctaText: item.ctaText,
        ctaUrl: item.ctaUrl
    }));

    return <NewsSectionClient initialNews={newsData} />;
}
