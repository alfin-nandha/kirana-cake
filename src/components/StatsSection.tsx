"use client";
import { useStore } from "./StoreProvider";

export default function StatsSection() {
    const store = useStore();

    if (!store) return null;

    const stats = [
        { value: `${store.rating}`, label: "Rating Toko", suffix: "⭐", bgLight: "bg-brand-highlight/30", bgDark: "dark:bg-brand-dark-surface", textColor: "text-brand-heading dark:text-brand-highlight" },
        { value: store.reviewCount.toLocaleString("id-ID"), label: "Ulasan Pembeli", suffix: "+", bgLight: "bg-brand-highlight/20", bgDark: "dark:bg-brand-dark-surface", textColor: "text-brand-button dark:text-brand-highlight" },
        { value: (store.soldCount / 1000).toFixed(0) + "rb", label: "Produk Terjual", suffix: "+", bgLight: "bg-brand-highlight/30", bgDark: "dark:bg-brand-dark-surface", textColor: "text-brand-heading dark:text-brand-highlight" },
        { value: "100%", label: "Bahan Berkualitas", suffix: "", bgLight: "bg-brand-highlight/20", bgDark: "dark:bg-brand-dark-surface", textColor: "text-brand-button dark:text-brand-highlight" },
    ];

    return (
        <section className="py-14 bg-white/60 dark:bg-brand-dark-surface border-y border-brand-highlight/30 dark:border-brand-dark-border transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`text-center rounded-2xl p-6 ${stat.bgLight} ${stat.bgDark} group hover:-translate-y-1 transition-all duration-300`}
                        >
                            <div className={`text-3xl md:text-4xl font-bold ${stat.textColor} mb-1 group-hover:scale-110 transition-transform duration-300`}>
                                {stat.value}
                                <span className="text-xl">{stat.suffix}</span>
                            </div>
                            <div className="text-brand-text/60 dark:text-brand-dark-muted text-sm mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
