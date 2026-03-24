"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { useStatus } from "@/components/ui/StatusProvider";


interface ProductFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function ProductForm({ initialData, isEditing }: ProductFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        price: initialData?.price || 0,
        category: initialData?.category || "Sourdough Bread",
        description: initialData?.description || "",
        isFeatured: initialData?.isFeatured || false,
        isHidden: initialData?.isHidden || false,
        variants: initialData?.variants ? initialData.variants.join(", ") : "Original",
    });

    const [images, setImages] = useState<string[]>(initialData?.images || []);
    const { showToast, setLoading } = useStatus();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            price: Number(formData.price),
            images,
            variants: formData.variants.split(",").map((v: string) => v.trim()),
        };

        try {
            const url = isEditing ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                showToast(isEditing ? "Produk berhasil diupdate!" : "Produk berhasil ditambahkan!", "success");
                router.push("/admin/products");
                router.refresh();
            } else {
                showToast("Gagal menyimpan produk. Silakan coba lagi.", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Terjadi kesalahan koneksi.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Nama Produk</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Harga (Rp)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Kategori</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                            >
                                <option>Sourdough Bread</option>
                                <option>Traditional Snacks</option>
                                <option>Pastry</option>
                                <option>Korean Snacks</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Deskripsi</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none h-32"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Varian (pisahkan dengan koma)</label>
                        <input
                            type="text"
                            value={formData.variants}
                            onChange={(e) => setFormData({ ...formData, variants: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Pengaturan</label>
                        <div className="space-y-4 bg-brand-highlight/5 p-6 rounded-2xl border border-brand-highlight/10">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    className="w-5 h-5 accent-brand-button"
                                />
                                <span className="text-sm font-medium text-brand-heading dark:text-brand-highlight">Tampilkan di Unggulan (Landing Page)</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isHidden}
                                    onChange={(e) => setFormData({ ...formData, isHidden: e.target.checked })}
                                    className="w-5 h-5 accent-brand-button"
                                />
                                <span className="text-sm font-medium text-brand-heading dark:text-brand-highlight">Sembunyikan Produk</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Gambar Produk</label>
                        <div className="space-y-4">
                            <ImageUpload type="products" onUploadSuccess={(url) => setImages([...images, url])} />


                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-brand-highlight/20">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
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
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="https://example.com/image.jpg"
                                        className="flex-1 px-4 py-2 rounded-lg border border-brand-highlight/20 dark:bg-brand-dark-bg text-xs"
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
                    </div>

                </div>
            </div>

            <div className="pt-6 border-t border-brand-highlight/10 flex gap-4">
                <button
                    type="submit"
                    className="bg-brand-button hover:bg-brand-button/90 text-white px-10 py-3 rounded-full font-bold transition-all shadow-lg shadow-brand-button/20"
                >
                    {isEditing ? "Update Produk" : "Simpan Produk"}
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
