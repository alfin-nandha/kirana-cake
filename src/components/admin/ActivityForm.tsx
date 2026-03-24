"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { useStatus } from "@/components/ui/StatusProvider";

interface ActivityFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function ActivityForm({ initialData, isEditing }: ActivityFormProps) {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        ctaText: initialData?.ctaText || "Selengkapnya",
        ctaUrl: initialData?.ctaUrl || "#",
        isHidden: initialData?.isHidden || false,
    });

    const [images, setImages] = useState<string[]>(
        initialData?.images ? JSON.parse(initialData.images) : []
    );
    const { showToast, setLoading } = useStatus();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            images,
        };

        try {
            const url = isEditing ? `/api/admin/activities/${initialData.id}` : "/api/admin/activities";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                showToast(isEditing ? "Aktivitas berhasil diupdate!" : "Aktivitas berhasil ditambahkan!", "success");
                router.push("/admin/activities");
                router.refresh();
            } else {
                showToast("Gagal menyimpan aktivitas. Silahkan coba lagi.", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Terjadi kesalahan koneksi.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Judul Aktivitas</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Tanggal</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Deskripsi</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none h-48"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Gambar Aktivitas</label>
                        <div className="space-y-4">
                            <ImageUpload
                                type="activities"
                                onUploadSuccess={(url) => setImages([...images, url])}
                            />

                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative group aspect-video rounded-xl overflow-hidden border border-brand-highlight/20">
                                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                            className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-2 border-t border-brand-highlight/10">
                                <label className="block text-[9px] font-bold text-brand-heading/40 dark:text-brand-highlight/40 mb-1 uppercase">Atau masukkan URL manual</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-2 rounded-lg border border-brand-highlight/20 dark:bg-brand-dark-bg text-xs"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const val = (e.target as HTMLInputElement).value;
                                            if (val) {
                                                setImages([...images, val]);
                                                (e.target as HTMLInputElement).value = "";
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Teks Tombol (CTA)</label>
                            <input
                                type="text"
                                value={formData.ctaText}
                                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">URL Tombol (CTA)</label>
                            <input
                                type="text"
                                value={formData.ctaUrl}
                                onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                            />
                        </div>
                    </div>

                    <div className="bg-brand-highlight/5 p-6 rounded-2xl border border-brand-highlight/10">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isHidden}
                                onChange={(e) => setFormData({ ...formData, isHidden: e.target.checked })}
                                className="w-5 h-5 accent-brand-button"
                            />
                            <span className="text-sm font-medium text-brand-heading dark:text-brand-highlight">Sembunyikan dari Publik</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-brand-highlight/10 flex gap-4">
                <button
                    type="submit"
                    className="bg-brand-button hover:bg-brand-button/90 text-white px-10 py-3 rounded-full font-bold transition-all shadow-lg shadow-brand-button/20"
                >
                    {isEditing ? "Update Aktivitas" : "Simpan Aktivitas"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-10 py-3 rounded-full font-bold text-brand-text/60 hover:bg-brand-highlight/10 transition-all uppercase tracking-widest text-xs"
                >
                    Batal
                </button>
            </div>
        </form>
    );
}
