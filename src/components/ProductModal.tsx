"use client";

import { useState } from "react";
import Image from "next/image";
import store from "@/data/store.json";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        id: number;
        name: string;
        price: number;
        category: string;
        description: string;
        images: string[];
        variants: string[];
    } | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!isOpen || !product) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-brand-dark-surface w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative transition-all duration-300 transform scale-100"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image Carousel */}
                <div className="relative aspect-square w-full bg-brand-bg dark:bg-brand-dark-bg group">
                    {product.images.length > 0 ? (
                        <>
                            <Image
                                src={product.images[currentImageIndex]}
                                alt={`${product.name} image ${currentImageIndex + 1}`}
                                fill
                                className="object-cover"
                            />

                            {/* Carousel Controls */}
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black text-brand-heading dark:text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black text-brand-heading dark:text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    {/* Indicators */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                        {product.images.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-brand-text/50 dark:text-brand-dark-muted">
                            Tidak ada gambar
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <span className="inline-block text-xs font-semibold bg-brand-highlight/20 text-brand-button px-3 py-1 rounded-full mb-3">
                                {product.category}
                            </span>
                            <h2 className="text-2xl font-bold text-brand-heading dark:text-brand-highlight">
                                {product.name}
                            </h2>
                        </div>
                        <div className="text-xl font-bold text-brand-button dark:text-brand-highlight text-right">
                            {formatPrice(product.price)}
                        </div>
                    </div>

                    <p className="text-brand-text/80 dark:text-brand-dark-muted mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    {product.variants && product.variants.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-brand-heading dark:text-brand-highlight mb-2">
                                Varian Tersedia:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {product.variants.map((variant, idx) => (
                                    <span key={idx} className="border border-brand-button/30 dark:border-brand-highlight/30 text-xs px-3 py-1 rounded-md text-brand-text dark:text-brand-dark-muted">
                                        {variant}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="pt-4 border-t border-brand-highlight/30 dark:border-brand-dark-border flex flex-col sm:flex-row gap-3">
                        <a
                            href={`https://wa.me/${store.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`${store.whatsappMessage} ${product.name}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 2.17.69 4.18 1.86 5.86L3 21l3.24-.87A9.974 9.974 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1.07 14.89c-.58.05-1.12-.2-1.46-.62-.97-1.1-2.47-2.61-3.57-3.58-.41-.35-.67-.88-.61-1.46.07-.63.48-1.18 1.09-1.4l1.17-.43c.47-.17 1.01.03 1.25.48l1.17 2.19c.22.42.13.95-.24 1.28l-.66.59c-.21.19-.24.51-.06.74 1.15 1.48 2.58 2.89 4.09 4.01.23.17.56.13.74-.08l.58-.68c.32-.38.86-.48 1.29-.25l2.21 1.19c.45.24.64.79.46 1.26l-.42 1.18c-.22.61-.78 1.03-1.42 1.09z" clipRule="evenodd" />
                            </svg>
                            WhatsApp
                        </a>
                        <a
                            href={store.tokopediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center bg-brand-button hover:bg-brand-button/90 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            Tokopedia
                        </a>
                        <button
                            onClick={onClose}
                            className="sm:max-w-[120px] w-full bg-gray-100 dark:bg-brand-dark-bg hover:bg-gray-200 dark:hover:bg-brand-dark-border text-brand-heading dark:text-brand-text font-semibold py-3 rounded-xl transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
