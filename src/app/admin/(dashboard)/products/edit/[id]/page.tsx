import ProductForm from "@/components/admin/ProductForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const productDB = await prisma.product.findUnique({
        where: { id },
    });

    if (!productDB) {
        notFound();
    }

    const product = {
        ...productDB,
        images: JSON.parse(productDB.images),
        variants: JSON.parse(productDB.variants),
    };

    return (
        <div className="bg-brand-bg dark:bg-brand-dark-bg min-h-screen pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-brand-heading dark:text-brand-highlight mb-2">
                        Edit <span className="text-brand-button">Produk</span>
                    </h1>
                    <p className="text-brand-text/60 dark:text-brand-dark-muted">Ubah detail produk {product.name}</p>
                </div>

                <div className="bg-white dark:bg-brand-dark-surface p-10 rounded-3xl shadow-2xl border border-brand-highlight/10">
                    <ProductForm initialData={product} isEditing={true} />
                </div>
            </div>
        </div>
    );
}
