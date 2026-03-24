"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStatus } from "@/components/ui/StatusProvider";
import { Loader2 } from "lucide-react";

export default function ContactManagementPage() {
    const [formData, setFormData] = useState({
        name: "",
        tagline: "",
        description: "",
        whatsappNumber: "",
        whatsappMessage: "",
        tokopediaUrl: "",
        instagram: "",
        mapsUrl: "",
        fullAddress: "",
        rating: 4.9,
        reviewCount: 2000,
        soldCount: 14000,
        lat: -6.3144444,
        lng: 106.845466,
        showHero: true,
        showStats: true,
        showProducts: true,
        showNews: true,
        showAbout: true,
        showReviews: true,
        showContact: true,
    });

    const [loading, setLoading] = useState(true);
    const { showToast, setLoading: setGlobalLoading, isLoading } = useStatus();
    const router = useRouter();

    useEffect(() => {
        fetch("/api/admin/config")
            .then((res) => res.json())
            .then((data) => {
                setFormData(data);
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setGlobalLoading(true);

        try {
            const res = await fetch("/api/admin/config", {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                showToast("Konfigurasi berhasil disimpan!", "success");
                router.refresh();
            } else {
                showToast("Gagal menyimpan konfigurasi", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Terjadi kesalahan sistem", "error");
        } finally {
            setGlobalLoading(false);
        }
    };

    if (loading) return <div className="p-8">Memuat data...</div>;

    const sections = [
        { key: "showHero", label: "Hero (Banner Atas)" },
        { key: "showStats", label: "Statistik Toko" },
        { key: "showProducts", label: "Daftar Produk" },
        { key: "showNews", label: "Berita & Promo" },
        { key: "showAbout", label: "Tentang Kami" },
        { key: "showReviews", label: "Ulasan Pembeli" },
        { key: "showContact", label: "Kontak & Peta" },
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-brand-heading dark:text-brand-highlight mb-2">
                    Kontak & <span className="text-brand-button">Landing Page</span>
                </h1>
                <p className="text-brand-text/60 dark:text-brand-dark-muted">Kelola informasi toko dan tampilan halaman depan.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Visibility Toggles */}
                <div className="bg-white dark:bg-brand-dark-surface p-10 rounded-3xl shadow-xl border border-brand-highlight/10">
                    <h3 className="text-lg font-bold text-brand-heading dark:text-brand-highlight border-b border-brand-highlight/10 pb-2 mb-6 uppercase tracking-widest text-xs">Tampilan Halaman Depan</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {sections.map(({ key, label }) => (
                            <label key={key} className="flex items-center gap-3 p-4 rounded-2xl bg-brand-highlight/5 border border-brand-highlight/10 cursor-pointer hover:bg-brand-highlight/10 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={(formData as any)[key]}
                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                                    className="w-5 h-5 accent-brand-button"
                                />
                                <span className="text-sm font-medium text-brand-heading dark:text-brand-highlight">{label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-brand-dark-surface p-10 rounded-3xl shadow-xl border border-brand-highlight/10">
                    <h3 className="text-lg font-bold text-brand-heading dark:text-brand-highlight border-b border-brand-highlight/10 pb-2 mb-6 uppercase tracking-widest text-xs">Profil Toko</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Nama Toko</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Tagline</label>
                                <input
                                    type="text"
                                    value={formData.tagline}
                                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Deskripsi Toko</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none h-32"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-brand-dark-surface p-10 rounded-3xl shadow-xl border border-brand-highlight/10 space-y-6">
                        <h3 className="text-lg font-bold text-brand-heading dark:text-brand-highlight border-b border-brand-highlight/10 pb-2 uppercase tracking-widest text-xs">WhatsApp & Sosial</h3>
                        <div>
                            <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Nomor WA (Gunakan 628...)</label>
                            <input
                                type="text"
                                value={formData.whatsappNumber}
                                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Pesan Otomatis WA</label>
                            <input
                                type="text"
                                value={formData.whatsappMessage}
                                onChange={(e) => setFormData({ ...formData, whatsappMessage: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">URL Tokopedia</label>
                            <input
                                type="text"
                                value={formData.tokopediaUrl || ""}
                                onChange={(e) => setFormData({ ...formData, tokopediaUrl: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Instagram (Username @)</label>
                            <input
                                type="text"
                                value={formData.instagram || ""}
                                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-brand-dark-surface p-10 rounded-3xl shadow-xl border border-brand-highlight/10 space-y-6">
                        <h3 className="text-lg font-bold text-brand-heading dark:text-brand-highlight border-b border-brand-highlight/10 pb-2 uppercase tracking-widest text-xs">Statistik Bisnis</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Rating (Bintang)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Jumlah Ulasan</label>
                                <input
                                    type="number"
                                    value={formData.reviewCount}
                                    onChange={(e) => setFormData({ ...formData, reviewCount: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Produk Terjual</label>
                            <input
                                type="number"
                                value={formData.soldCount}
                                onChange={(e) => setFormData({ ...formData, soldCount: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-brand-dark-surface p-10 rounded-3xl shadow-xl border border-brand-highlight/10 space-y-6">
                    <h3 className="text-lg font-bold text-brand-heading dark:text-brand-highlight border-b border-brand-highlight/10 pb-2 uppercase tracking-widest text-xs">Lokasi & Maps</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Alamat Lengkap</label>
                                <textarea
                                    value={formData.fullAddress || ""}
                                    onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none h-24"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">URL Google Maps</label>
                                <input
                                    type="text"
                                    value={formData.mapsUrl || ""}
                                    onChange={(e) => setFormData({ ...formData, mapsUrl: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Latitude</label>
                                    <input
                                        type="number"
                                        step="0.0000001"
                                        value={formData.lat}
                                        onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">Longitude</label>
                                    <input
                                        type="number"
                                        step="0.0000001"
                                        value={formData.lng}
                                        onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg focus:ring-2 focus:ring-brand-button outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-brand-button hover:bg-brand-button/90 text-white px-10 py-5 rounded-full font-bold transition-all shadow-xl shadow-brand-button/30 disabled:opacity-50 w-full text-lg uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Menyimpan Data...
                            </>
                        ) : "Simpan Perubahan Konfigurasi"}
                    </button>
                </div>
            </form>
        </div>
    );
}
