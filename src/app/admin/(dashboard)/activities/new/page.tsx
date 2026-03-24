import ActivityForm from "@/components/admin/ActivityForm";

export default function NewActivityPage() {
    return (
        <div className="p-8">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-brand-heading dark:text-brand-highlight mb-2">
                    Tambah <span className="text-brand-button">Aktivitas Baru</span>
                </h1>
                <p className="text-brand-text/60 dark:text-brand-dark-muted">Buat berita atau promo terbaru untuk KafkaChips.</p>
            </div>

            <div className="bg-white dark:bg-brand-dark-surface p-10 rounded-3xl shadow-2xl border border-brand-highlight/10">
                <ActivityForm />
            </div>
        </div>
    );
}
