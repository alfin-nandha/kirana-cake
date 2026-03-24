import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
    return (
        <div className="bg-brand-bg dark:bg-brand-dark-bg min-h-screen pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-brand-heading dark:text-brand-highlight mb-2">
                        Tambah <span className="text-brand-button">Produk Baru</span>
                    </h1>
                    <p className="text-brand-text/60 dark:text-brand-dark-muted">Lengkapi detail produk di bawah ini untuk menambah katalog baru.</p>
                </div>

                <div className="bg-white dark:bg-brand-dark-surface p-10 rounded-3xl shadow-2xl border border-brand-highlight/10">
                    <ProductForm />
                </div>
            </div>
        </div>
    );
}
