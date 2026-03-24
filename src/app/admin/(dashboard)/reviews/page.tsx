"use client";

import { useEffect, useState } from "react";
import { useStatus } from "@/components/ui/StatusProvider";

export default function ReviewsManagementPage() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast, setLoading: setGlobalLoading } = useStatus();

    useEffect(() => {
        fetch("/api/admin/reviews")
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(() => showToast("Gagal memuat ulasan", "error"));
    }, [showToast]);

    const toggleHide = async (id: number, currentHidden: boolean) => {
        setGlobalLoading(true);
        try {
            const res = await fetch(`/api/admin/reviews/${id}`, {
                method: "PUT",
                body: JSON.stringify({ isHidden: !currentHidden }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                setReviews(reviews.map(r => r.id === id ? { ...r, isHidden: !currentHidden } : r));
                showToast(currentHidden ? "Ulasan sekarang ditampilkan" : "Ulasan telah disembunyikan", "success");
            } else {
                showToast("Gagal memperbarui status ulasan", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Terjadi kesalahan sistem", "error");
        } finally {
            setGlobalLoading(false);
        }
    };

    if (loading) return (
        <div className="p-8 flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse text-brand-text/40 font-medium tracking-widest uppercase text-xs">Memuat ulasan...</div>
        </div>
    );

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-brand-heading dark:text-brand-highlight mb-2">
                        Manajemen <span className="text-brand-button">Ulasan</span>
                    </h1>
                    <p className="text-brand-text/60 dark:text-brand-dark-muted text-sm">Kelola ulasan pembeli yang tampil di halaman utama.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-brand-dark-surface rounded-3xl shadow-xl border border-brand-highlight/10 overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="bg-brand-highlight/5 border-b border-brand-highlight/10">
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-heading/60 dark:text-brand-highlight/60">Pengguna</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-heading/60 dark:text-brand-highlight/60">Rating</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-heading/60 dark:text-brand-highlight/60">Komentar</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-heading/60 dark:text-brand-highlight/60 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-highlight/10">
                        {reviews.map((review) => (
                            <tr key={review.id} className="hover:bg-brand-highlight/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-brand-heading dark:text-brand-highlight">{review.userName}</div>
                                    <div className="text-[10px] text-brand-text/40">{review.date}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-lg">{i < review.rating ? "★" : "☆"}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 max-w-sm">
                                    <p className="text-sm text-brand-text/70 dark:text-brand-dark-muted line-clamp-2">
                                        {review.comment}
                                    </p>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => toggleHide(review.id, review.isHidden)}
                                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${review.isHidden
                                            ? "bg-brand-highlight/20 text-brand-text/60 hover:bg-brand-highlight/30"
                                            : "bg-brand-button/10 text-brand-button hover:bg-brand-button hover:text-white shadow-sm"
                                            }`}
                                    >
                                        {review.isHidden ? "Tampilkan" : "Sembunyikan"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {reviews.length === 0 && (
                    <div className="p-10 text-center text-brand-text/40 italic">Belum ada ulasan untuk ditampilkan.</div>
                )}
            </div>
        </div>
    );
}
