import prisma from "@/lib/prisma";

export default async function ReviewsSection() {
    const reviews = await prisma.review.findMany({
        where: { isHidden: false },
        orderBy: { createdAt: "desc" },
    });

    return (
        <section id="reviews" className="py-24 bg-white/50 dark:bg-brand-dark-surface transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block text-brand-button dark:text-brand-highlight text-sm font-semibold uppercase tracking-widest mb-3">
                        Ulasan Pelanggan
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-brand-heading dark:text-brand-highlight mb-4">
                        Apa Kata <span className="text-brand-button">Mereka?</span>
                    </h2>
                    <p className="text-brand-text/60 dark:text-brand-dark-muted text-base max-w-xl mx-auto">
                        Kepercayaan pelanggan adalah prioritas kami. Berikut adalah beberapa testimoni asli dari pencinta roti kami.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {reviews.map((review: typeof reviews[number]) => (
                        <div
                            key={review.id}
                            className="bg-white dark:bg-brand-dark-bg border border-brand-highlight/30 dark:border-brand-dark-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < review.rating ? "text-amber-400" : "text-gray-300"}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-brand-text/80 dark:text-brand-dark-text italic mb-6 leading-relaxed">
                                &quot;{review.comment}&quot;
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-highlight/10">
                                <div className="font-bold text-brand-heading dark:text-brand-highlight">
                                    {review.userName}
                                </div>
                                <div className="text-xs text-brand-text/50 dark:text-brand-dark-muted">
                                    {review.date}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
