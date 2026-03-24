"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStatus } from "@/components/ui/StatusProvider";

export default function ProductsManagementPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast, confirm, setLoading: setGlobalLoading } = useStatus();
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/admin/products");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
            showToast("Gagal memuat daftar produk", "error");
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id: number, field: string, currentValue: boolean) => {
        setGlobalLoading(true);
        try {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: "PUT",
                body: JSON.stringify({ [field]: !currentValue }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                showToast("Status berhasil diperbarui", "success");
                fetchProducts();
            } else {
                showToast("Gagal memperbarui status", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Terjadi kesalahan sistem", "error");
        } finally {
            setGlobalLoading(false);
        }
    };

    const deleteProduct = async (id: number) => {
        const ok = await confirm({
            title: "Hapus Produk",
            message: "Apakah Anda yakin ingin menghapus produk ini?",
            confirmText: "Ya, Hapus",
            cancelText: "Batal"
        });

        if (!ok) return;

        setGlobalLoading(true);
        try {
            const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
            if (res.ok) {
                showToast("Produk berhasil dihapus", "success");
                fetchProducts();
            } else {
                showToast("Gagal menghapus produk", "error");
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
            <div className="animate-pulse text-brand-text/40 font-medium tracking-widest uppercase text-xs">Memuat katalog...</div>
        </div>
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-brand-heading dark:text-brand-highlight mb-2">
                        Manajemen <span className="text-brand-button">Produk</span>
                    </h1>
                    <p className="text-brand-text/60 dark:text-brand-dark-muted text-sm italic">Atur katalog produk Kirana Cake Anda di sini.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-brand-button hover:bg-brand-button/90 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-brand-button/20 flex items-center justify-center gap-2"
                >
                    <span className="text-xl">+</span> Tambah Produk
                </Link>
            </div>

            <div className="bg-white dark:bg-brand-dark-surface rounded-3xl shadow-xl border border-brand-highlight/10 overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-brand-highlight/5 border-b border-brand-highlight/10">
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-heading/60 dark:text-brand-highlight/60">Produk</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-heading/60 dark:text-brand-highlight/60">Kategori</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-heading/60 dark:text-brand-highlight/60">Harga</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-heading/60 dark:text-brand-highlight/60">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-heading/60 dark:text-brand-highlight/60 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-highlight/10">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-brand-highlight/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-brand-highlight/10 overflow-hidden border border-brand-highlight/10 flex-shrink-0">
                                            {product.images && JSON.parse(product.images)[0] ? (
                                                <img
                                                    src={JSON.parse(product.images)[0]}
                                                    className="w-full h-full object-cover"
                                                    alt={product.name}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-brand-text/30 uppercase">No Pic</div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-brand-heading dark:text-brand-highlight">{product.name}</div>
                                            <div className="text-[10px] text-brand-text/40 dark:text-brand-dark-muted">ID: {product.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-brand-text/70 dark:text-brand-dark-muted">
                                    {product.category}
                                </td>
                                <td className="px-6 py-4 font-semibold text-brand-heading dark:text-brand-highlight">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => toggleStatus(product.id, 'isFeatured', product.isFeatured)}
                                            className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter transition-all ${product.isFeatured ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-400'}`}
                                        >
                                            {product.isFeatured ? 'Unggulan' : 'Reguler'}
                                        </button>
                                        <button
                                            onClick={() => toggleStatus(product.id, 'isHidden', product.isHidden)}
                                            className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter transition-all ${product.isHidden ? 'bg-red-100 text-red-700 focus:bg-red-200' : 'bg-green-100 text-green-700 focus:bg-green-200'}`}
                                        >
                                            {product.isHidden ? 'Tersembunyi' : 'Publik'}
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 transition-opacity">

                                        <Link
                                            href={`/admin/products/edit/${product.id}`}
                                            className="p-2 hover:bg-brand-highlight/20 rounded-lg text-brand-heading dark:text-brand-highlight transition-colors"
                                        >
                                            ✏️
                                        </Link>
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="p-10 text-center text-brand-text/40 italic">Belum ada produk. Klik "Tambah Produk" untuk memulai.</div>
                )}
            </div>
        </div>
    );
}
