import store from "@/data/store.json";

const features = [
    { icon: "🌾", title: "Bahan Alami Pilihan", desc: "Setiap produk dibuat dari bahan-bahan alami berkualitas tinggi tanpa pengawet buatan." },
    { icon: "🧪", title: "Sourdough Asli", desc: "Menggunakan starter sourdough aktif yang dirawat dengan penuh dedikasi untuk rasa terbaik." },
    { icon: "❤️", title: "Dibuat dengan Cinta", desc: "Setiap produk dibuat secara homemade dengan penuh perhatian dan cinta dari dapur Mimi." },
    { icon: "🚀", title: "Pengiriman Cepat", desc: "Tersedia di Tokopedia dengan layanan pengiriman ke seluruh Indonesia." },
];

export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-16">
                    <span className="inline-block text-brand-button dark:text-brand-highlight text-sm font-semibold uppercase tracking-widest mb-3">
                        Tentang Kami
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-heading dark:text-brand-highlight mb-6">
                        Cerita di Balik{" "}
                        <span className="text-brand-button">Kirana Cake</span>
                    </h2>
                    <p className="text-brand-text/70 dark:text-brand-dark-muted text-lg max-w-2xl mx-auto leading-relaxed">
                        {store.description}
                    </p>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="group bg-white dark:bg-brand-dark-surface border border-brand-highlight/30 dark:border-brand-dark-border rounded-2xl p-6 text-center hover:border-brand-button/50 hover:shadow-xl hover:shadow-brand-button/10 dark:hover:border-brand-highlight/40 transition-all duration-300 hover:-translate-y-1"
                        >
                            <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                                {f.icon}
                            </span>
                            <h3 className="text-brand-heading dark:text-brand-highlight font-semibold mb-2">{f.title}</h3>
                            <p className="text-brand-text/60 dark:text-brand-dark-muted text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
