import Link from "next/link";
import prisma from "@/lib/prisma";
import store from "@/data/store.json";
import ProductCard from "./ProductCard";

// Landing page limit
const FEATURED_LIMIT = 6;

const categoryColors: Record<string, string> = {
    "Sourdough Bread": "bg-brand-highlight/40 text-brand-heading border-brand-highlight/60 dark:bg-brand-highlight/15 dark:text-brand-highlight dark:border-brand-highlight/30",
    "Traditional Snacks": "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-400/15 dark:text-rose-300 dark:border-rose-400/30",
    "Pastry": "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-400/15 dark:text-purple-300 dark:border-purple-400/30",
    "Korean Snacks": "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-400/15 dark:text-sky-300 dark:border-sky-400/30",
};

export default async function ProductsSection() {
    // Fetch featured products from database
    const productsDB = await prisma.product.findMany({
        where: {
            isHidden: false,
            isFeatured: true
        },
        take: FEATURED_LIMIT,
        orderBy: { updatedAt: 'desc' }
    });

    // Parse JSON
    const featured = productsDB.map((p: typeof productsDB[number]) => ({
        ...p,
        images: JSON.parse(p.images),
        variants: JSON.parse(p.variants)
    }));


    return (
        <section id="products" className="py-24 bg-white/50 dark:bg-brand-dark-surface transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-brand-button dark:text-brand-highlight text-sm font-semibold uppercase tracking-widest mb-3">
                        Menu Pilihan
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-heading dark:text-brand-highlight mb-4">
                        Produk <span className="text-brand-button">Unggulan</span>
                    </h2>
                    <p className="text-brand-text/60 dark:text-brand-dark-muted text-base max-w-xl mx-auto">
                        Temukan berbagai pilihan roti sourdough dan kue tradisional buatan tangan yang lezat.
                    </p>
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((product: typeof featured[number]) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isFeatured={false}
                            categoryColors={categoryColors}
                            storeUrl={store.tokopediaUrl}
                        />
                    ))}
                </div>

                {/* View all CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 border-2 border-brand-button dark:border-brand-highlight text-brand-button dark:text-brand-highlight hover:bg-brand-button dark:hover:bg-brand-highlight hover:text-white dark:hover:text-brand-text px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-200"
                    >
                        Lihat Semua Produk
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
