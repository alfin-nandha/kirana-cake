"use client";
import Image from "next/image";
import { useStore } from "./StoreProvider";

export default function HeroSection() {
    const store = useStore();

    if (!store) return null;

    const waUrl = `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(store.whatsappMessage)}`;

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-300"
        >
            {/* Decorative blobs */}
            <div className="absolute top-1/3 -left-24 w-80 h-80 bg-brand-highlight/30 dark:bg-brand-highlight/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-24 w-72 h-72 bg-brand-button/20 dark:bg-brand-button/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">

                    {/* Left – text content */}
                    <div className="text-center lg:text-left order-2 lg:order-1">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-brand-highlight/40 dark:bg-brand-highlight/15 border border-brand-highlight/60 dark:border-brand-highlight/30 rounded-full px-4 py-1.5 mb-8">
                            <span className="text-brand-heading dark:text-brand-highlight text-sm font-semibold">⭐ {store.rating} Rating</span>
                            <span className="text-brand-button/50">•</span>
                            <span className="text-brand-text/70 dark:text-brand-dark-muted text-sm">{store.reviewCount.toLocaleString("id-ID")}+ Ulasan</span>
                        </div>

                        {/* Main heading */}
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-brand-heading dark:text-brand-highlight">
                            {store.name.split(" by ")[0]}
                            <span className="block text-2xl md:text-3xl font-light text-brand-button dark:text-brand-dark-muted mt-2 tracking-wide">
                                by Mimi
                            </span>
                        </h1>

                        {/* Tagline */}
                        <p className="text-base md:text-lg text-brand-text/70 dark:text-brand-dark-muted mt-4 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            {store.tagline}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                href={store.tokopediaUrl || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-brand-button hover:opacity-90 text-white font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:shadow-xl hover:shadow-brand-button/30 hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" />
                                </svg>
                                Belanja di Tokopedia
                            </a>
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 border-2 border-brand-button text-brand-button dark:text-brand-highlight dark:border-brand-highlight font-bold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:bg-brand-button hover:text-white dark:hover:bg-brand-highlight dark:hover:text-brand-text hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Pesan via WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Right – hero image */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md lg:max-w-lg">
                            {/* Decorative ring */}
                            <div className="absolute inset-0 rounded-3xl bg-brand-highlight/20 dark:bg-brand-highlight/10 transform rotate-3" />
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-heading/20 dark:shadow-brand-dark-bg">
                                <Image
                                    src="/hero-bread.png"
                                    alt="Kirana Cake – Artisan Sourdough Breads"
                                    width={600}
                                    height={500}
                                    className="object-cover w-full h-80 lg:h-[420px]"
                                    priority
                                />
                            </div>
                            {/* Floating badge on image */}
                            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-brand-dark-surface border border-brand-highlight/40 rounded-2xl px-4 py-3 shadow-xl">
                                <div className="text-brand-button font-bold text-lg">{store.soldCount.toLocaleString("id-ID")}+</div>
                                <div className="text-brand-text/60 dark:text-brand-dark-muted text-xs">Produk Terjual</div>
                            </div>
                            <div className="absolute -top-4 -right-4 bg-brand-highlight dark:bg-brand-button text-brand-text dark:text-white rounded-2xl px-4 py-3 shadow-xl">
                                <div className="font-bold text-lg">{store.rating} ⭐</div>
                                <div className="text-xs opacity-70">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
