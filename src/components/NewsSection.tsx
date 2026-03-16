"use client";

import { useState } from "react";
import Image from "next/image";
import newsData from "@/data/news.json";
import NewsModal from "./NewsModal";

export default function NewsSection() {
    const [selectedNews, setSelectedNews] = useState<typeof newsData[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (news: typeof newsData[0]) => {
        setSelectedNews(news);
        setIsModalOpen(true);
    };

    return (
        <section id="news" className="py-24 bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block text-brand-button dark:text-brand-highlight text-sm font-semibold uppercase tracking-widest mb-3">
                        Berita & Promo
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-heading dark:text-brand-highlight mb-4">
                        Aktivitas <span className="text-brand-button">Terbaru</span>
                    </h2>
                    <p className="text-brand-text/60 dark:text-brand-dark-muted text-base max-w-xl mx-auto">
                        Ikuti perkembangan terbaru, promo menarik, dan cerita di balik dapur Kirana Cake.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {newsData.map((item) => (
                        <div
                            key={item.id}
                            className="group flex flex-col md:flex-row bg-white dark:bg-brand-dark-surface border border-brand-highlight/30 dark:border-brand-dark-border rounded-2xl overflow-hidden hover:border-brand-button/50 dark:hover:border-brand-highlight/40 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image side */}
                            <div className="relative w-full md:w-48 h-48 md:h-auto bg-brand-highlight/10 dark:bg-brand-dark-bg cursor-pointer overflow-hidden" onClick={() => openModal(item)}>
                                {item.images && item.images.length > 0 ? (
                                    <Image
                                        src={item.images[0]}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-brand-button/30">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Content side */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-brand-button/70 dark:text-brand-highlight/70 uppercase tracking-tighter">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                                <h3 className="text-xl font-bold text-brand-heading dark:text-brand-highlight mb-3 group-hover:text-brand-button transition-colors cursor-pointer" onClick={() => openModal(item)}>
                                    {item.title}
                                </h3>
                                <p className="text-brand-text/70 dark:text-brand-dark-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                    {item.description}
                                </p>
                                <div>
                                    <button
                                        onClick={() => openModal(item)}
                                        className="inline-flex items-center gap-2 text-brand-button dark:text-brand-highlight font-semibold text-sm hover:translate-x-1 transition-transform"
                                    >
                                        {item.ctaText}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <NewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                news={selectedNews}
            />
        </section>
    );
}
