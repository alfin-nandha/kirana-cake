"use client";

import { useState } from "react";
import Image from "next/image";

interface NewsItem {
    id: number;
    title: string;
    date: string;
    description: string;
    images: string[];
    ctaText: string;
    ctaUrl: string;
}

interface NewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    news: NewsItem | null;
}

export default function NewsModal({ isOpen, onClose, news }: NewsModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!isOpen || !news) return null;

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % news.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + news.images.length) % news.images.length);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-brand-dark-surface w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative transition-all duration-300 transform scale-100"
                onClick={(e) => e.stopPropagation()}
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
                <div className="relative aspect-video w-full bg-brand-bg dark:bg-brand-dark-bg group">
                    {news.images && news.images.length > 0 ? (
                        <>
                            <Image
                                src={news.images[currentImageIndex]}
                                alt={`${news.title} image ${currentImageIndex + 1}`}
                                fill
                                className="object-cover"
                            />

                            {news.images.length > 1 && (
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

                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                        {news.images.map((_, idx) => (
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
                    <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-brand-button/70 dark:text-brand-highlight/70 uppercase tracking-tighter">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(news.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>

                    <h2 className="text-2xl font-bold text-brand-heading dark:text-brand-highlight mb-4">
                        {news.title}
                    </h2>

                    <p className="text-brand-text/80 dark:text-brand-dark-muted mb-8 leading-relaxed">
                        {news.description}
                    </p>

                    <div className="pt-6 border-t border-brand-highlight/30 dark:border-brand-dark-border flex items-center justify-between">
                        {news.ctaUrl !== "#" ? (
                            <a
                                href={news.ctaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-button hover:bg-brand-button/90 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
                            >
                                {news.ctaText}
                            </a>
                        ) : (
                            <div />
                        )}
                        <button
                            onClick={onClose}
                            className="text-brand-text/60 dark:text-brand-dark-muted font-medium hover:text-brand-button transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
