import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";
import store from "@/data/store.json";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Katalog Produk Artisan Sourdough & Kue Homemade",
    description: "Jelajahi koleksi lengkap roti sourdough artisan, kue tradisional Indonesia, pastry, dan snack Korea dari Kirana Cake by Mimi. Pesan sekarang melalui Tokopedia.",
    openGraph: {
        title: "Katalog Produk Kirana Cake by Mimi",
        description: "Artisan Sourdough Breads & Traditional Snacks terbaik di Jakarta Selatan.",
        images: ['/og-image.png'],
    }
};

const categoryColors: Record<string, string> = {
    "Sourdough Bread": "bg-brand-highlight/40 text-brand-heading border-brand-highlight/60 dark:bg-brand-highlight/15 dark:text-brand-highlight dark:border-brand-highlight/30",
    "Traditional Snacks": "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-400/15 dark:text-rose-300 dark:border-rose-400/30",
    "Pastry": "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-400/15 dark:text-purple-300 dark:border-purple-400/30",
    "Korean Snacks": "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-400/15 dark:text-sky-300 dark:border-sky-400/30",
};

interface ParsedProduct {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
    variants: string[];
    isFeatured: boolean;
    isHidden: boolean;
}

export default async function ProductsPage() {
    // Fetch products from database
    const productsDB = await prisma.product.findMany({
        where: { isHidden: false },
        orderBy: { updatedAt: 'desc' }
    });

    // Parse JSON strings back to arrays
    const products: ParsedProduct[] = productsDB.map((p: any) => ({
        ...p,
        images: JSON.parse(p.images as string) as string[],
        variants: JSON.parse(p.variants as string) as string[]
    }));

    const allCategories: string[] = ["Semua", ...Array.from(new Set<string>(products.map((p) => p.category)))];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-300 pt-24 pb-20">
                <div className="max-w-6xl mx-auto px-6">

                    {/* Page header */}
                    <div className="text-center mb-14">
                        <span className="inline-block text-brand-button dark:text-brand-highlight text-sm font-semibold uppercase tracking-widest mb-3">
                            Katalog Lengkap
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold text-brand-heading dark:text-brand-highlight mb-4">
                            Semua <span className="text-brand-button">Produk</span>
                        </h1>
                        <p className="text-brand-text/60 dark:text-brand-dark-muted text-base max-w-xl mx-auto">
                            Semua produk roti dan kue homemade dari Kirana Cake by Mimi — tersedia di Tokopedia.
                        </p>
                    </div>

                    {/* Category pills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {allCategories.map((cat) => (
                            <span
                                key={cat}
                                className="border border-brand-button/40 dark:border-brand-highlight/30 text-brand-button dark:text-brand-highlight text-sm px-4 py-1.5 rounded-full cursor-pointer hover:bg-brand-button hover:text-white dark:hover:bg-brand-highlight dark:hover:text-brand-text transition-all"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    {/* Products grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isFeatured={index < 6}
                                categoryColors={categoryColors}
                                storeUrl={store.tokopediaUrl}
                            />
                        ))}
                    </div>

                    {/* Back link */}
                    <div className="text-center mt-14">
                        <a href="/" className="inline-flex items-center gap-2 text-brand-button dark:text-brand-highlight hover:underline text-sm font-medium">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Kembali ke Beranda
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
