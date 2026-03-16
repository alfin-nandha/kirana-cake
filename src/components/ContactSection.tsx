import store from "@/data/store.json";

export default function ContactSection() {
    const waUrl = `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(store.whatsappMessage)}`;

    return (
        <section id="contact" className="py-24 bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block text-brand-button dark:text-brand-highlight text-sm font-semibold uppercase tracking-widest mb-4">
                        Hubungi Kami
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-heading dark:text-brand-highlight mb-6">
                        Siap Memesan? <span className="text-brand-button">Mulai Sekarang!</span>
                    </h2>
                    <p className="text-brand-text/70 dark:text-brand-dark-muted text-lg max-w-xl mx-auto leading-relaxed mb-12">
                        Pesan langsung melalui Tokopedia atau hubungi kami via WhatsApp untuk pesanan khusus, paket custom, atau pertanyaan lainnya.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Details & CTAs */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a
                                href={store.tokopediaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 bg-brand-button hover:opacity-90 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:shadow-2xl hover:shadow-brand-button/30 hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" />
                                </svg>
                                Tokopedia
                            </a>
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>

                        <div className="bg-white dark:bg-brand-dark-surface border border-brand-highlight/30 dark:border-brand-dark-border rounded-2xl p-8 space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-brand-highlight/20 flex items-center justify-center text-brand-button flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-heading dark:text-brand-highlight mb-1">Lokasi Kami</h4>
                                    <p className="text-brand-text/70 dark:text-brand-dark-muted text-sm leading-relaxed">
                                        {store.fullAddress}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-brand-highlight/20 flex items-center justify-center text-brand-button flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-heading dark:text-brand-highlight mb-1">Hubungi Langsung</h4>
                                    <p className="text-brand-text/70 dark:text-brand-dark-muted text-sm transition-colors hover:text-brand-button">
                                        {store.whatsappNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-brand-highlight/30 dark:border-brand-dark-border h-full min-h-[400px]">
                        {/* Using a high-quality static map image or an iframe */}
                        <iframe
                            title="Lokasi Kirana Cake"
                            src={`https://maps.google.com/maps?q=${store.coordinates.lat},${store.coordinates.lng}&hl=id&z=16&output=embed`}
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '400px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <a
                            href={store.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 left-4 bg-white dark:bg-brand-dark-surface text-brand-button dark:text-brand-highlight font-bold px-4 py-2 rounded-lg text-sm shadow-xl flex items-center gap-2 hover:bg-brand-button hover:text-white transition-all transform hover:-translate-y-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Buka di Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
