import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import DeleteActivityButton from "@/components/admin/DeleteActivityButton";

interface Activity {
    id: number;
    title: string;
    description: string;
    images: string | null;
    date: Date;
    ctaText: string;
    ctaUrl: string;
    isHidden: boolean;
}

export default async function AdminActivitiesPage() {
    const activities = await prisma.activity.findMany({
        orderBy: { date: "desc" },
    });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-brand-heading dark:text-brand-highlight">
                        Kelola Aktivitas & Berita
                    </h1>
                    <p className="text-sm text-brand-text/60 dark:text-brand-dark-muted">
                        Total {activities.length} aktivitas dalam database
                    </p>
                </div>
                <Link
                    href="/admin/activities/new"
                    className="bg-brand-button hover:bg-brand-button/90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-brand-button/20"
                >
                    + Tambah Aktivitas
                </Link>
            </div>

            <div className="bg-white dark:bg-brand-dark-surface rounded-2xl shadow-xl overflow-hidden border border-brand-highlight/20 transition-all">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-brand-highlight/10 dark:bg-brand-highlight/5 border-b border-brand-highlight/10">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-heading dark:text-brand-highlight">Aktivitas</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-heading dark:text-brand-highlight">Tanggal</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-heading dark:text-brand-highlight text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-brand-heading dark:text-brand-highlight text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-highlight/10">
                            {activities.map((a: Activity) => (
                                <tr key={a.id} className="hover:bg-brand-highlight/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-highlight/10 flex-shrink-0">
                                                {(() => {
                                                    const imgs = a.images ? JSON.parse(a.images as string) : [];
                                                    return imgs.length > 0 ? (
                                                        <Image src={imgs[0]} alt={a.title} width={48} height={48} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-brand-heading/20">📅</div>
                                                    );
                                                })()}
                                            </div>

                                            <div className="font-medium text-brand-heading dark:text-brand-highlight truncate max-w-[300px]">
                                                {a.title}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-brand-heading dark:text-brand-highlight">
                                        {new Date(a.date).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {a.isHidden ? (
                                            <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 font-bold uppercase tracking-tighter">Draft</span>
                                        ) : (
                                            <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-bold uppercase tracking-tighter">Live</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/activities/edit/${a.id}`}
                                                className="p-2 hover:bg-brand-highlight/20 rounded-lg text-brand-button transition-colors"
                                                title="Edit"
                                            >
                                                ✏️
                                            </Link>
                                            <DeleteActivityButton activityId={a.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {activities.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-brand-text/40 italic">
                                        Belum ada aktivitas. Klik &quot;Tambah Aktivitas&quot; untuk memulai.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
