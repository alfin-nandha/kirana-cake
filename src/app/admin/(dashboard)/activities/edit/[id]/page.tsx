import ActivityForm from "@/components/admin/ActivityForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditActivityPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const activity = await prisma.activity.findUnique({
        where: { id },
    });

    if (!activity) {
        notFound();
    }

    return (
        <div className="p-8">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-brand-heading dark:text-brand-highlight mb-2">
                    Edit <span className="text-brand-button">Aktivitas</span>
                </h1>
                <p className="text-brand-text/60 dark:text-brand-dark-muted">Ubah detail aktivitas {activity.title}</p>
            </div>

            <div className="bg-white dark:bg-brand-dark-surface p-10 rounded-3xl shadow-2xl border border-brand-highlight/10">
                <ActivityForm initialData={activity} isEditing={true} />
            </div>
        </div>
    );
}
