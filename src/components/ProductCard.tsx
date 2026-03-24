"use client";

import { useState } from "react";
import Image from "next/image";
import ProductModal from "./ProductModal";
import store from "@/data/store.json";

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
    variants: string[];
}

interface ProductCardProps {
    product: Product;
    isFeatured?: boolean;
    categoryColors: Record<string, string>;
    storeUrl?: string;
}

export default function ProductCard({ product, isFeatured = false, categoryColors, storeUrl }: ProductCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className="group relative bg-white dark:bg-brand-dark-surface border border-brand-highlight/30 dark:border-brand-dark-border rounded-2xl overflow-hidden hover:border-brand-button/50 dark:hover:border-brand-highlight/40 hover:shadow-xl hover:shadow-brand-button/10 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col h-full"
            >
                {/* Badge for featured/unggulan */}
                {isFeatured && (
                    <div className="absolute top-3 right-3 z-10 bg-brand-button text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                        Unggulan
                    </div>
                )}

                {/* Image thumbnail (only first image) */}
                <div className="relative aspect-square bg-brand-bg dark:bg-brand-dark-bg w-full">
                    {product.images && product.images.length > 0 ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-brand-highlight/5">
                            <svg className="w-16 h-16 text-brand-heading/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m18 11 3 3" />
                                <path d="m21 11-3 3" />
                                <path d="M11 11a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z" />
                                <path d="M16 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                            </svg>
                        </div>
                    )}
                </div>


                {/* Card body */}
                <div className="p-5 flex flex-col flex-grow">
                    <span className={`self-start inline-block text-xs font-medium border rounded-full px-3 py-0.5 mb-3 ${categoryColors[product.category] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                        {product.category}
                    </span>

                    <h2 className="text-brand-heading dark:text-brand-highlight font-semibold text-base mb-2 leading-snug group-hover:text-brand-button dark:group-hover:text-brand-dark-muted transition-colors">
                        {product.name}
                    </h2>

                    {/* Show variants summary */}
                    {product.variants && product.variants.length > 0 && (
                        <p className="text-xs text-brand-text/60 dark:text-brand-dark-muted mb-auto pb-4">
                            Varian: {product.variants.join(", ")}
                        </p>
                    )}

                    <div className="pt-2 border-t border-brand-highlight/10 dark:border-brand-dark-border mt-auto flex items-center justify-between">
                        <span className="text-brand-button dark:text-brand-highlight font-bold text-lg">
                            {formatPrice(product.price)}
                        </span>

                        {/* Only show store link if passed (e.g., on all products page, not necessarily landing page) */}
                        {storeUrl && (
                            <div className="flex items-center gap-2">
                                <a
                                    href={`https://wa.me/${store.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`${store.whatsappMessage} ${product.name}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-8 h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
                                    title="Pesan via WhatsApp"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 2.17.69 4.18 1.86 5.86L3 21l3.24-.87A9.974 9.974 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1.07 14.89c-.58.05-1.12-.2-1.46-.62-.97-1.1-2.47-2.61-3.57-3.58-.41-.35-.67-.88-.61-1.46.07-.63.48-1.18 1.09-1.4l1.17-.43c.47-.17 1.01.03 1.25.48l1.17 2.19c.22.42.13.95-.24 1.28l-.66.59c-.21.19-.24.51-.06.74 1.15 1.48 2.58 2.89 4.09 4.01.23.17.56.13.74-.08l.58-.68c.32-.38.86-.48 1.29-.25l2.21 1.19c.45.24.64.79.46 1.26l-.42 1.18c-.22.61-.78 1.03-1.42 1.09z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a
                                    href={storeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()} // Prevent opening modal when clicking buy
                                    className="text-xs font-semibold bg-brand-button/10 dark:bg-brand-highlight/10 text-brand-button dark:text-brand-highlight hover:bg-brand-button hover:text-white dark:hover:bg-brand-highlight dark:hover:text-brand-text px-3 py-1.5 rounded-full transition-all flex items-center gap-1"
                                >
                                    Tokopedia
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Portal Component */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
            />
        </>
    );
}
