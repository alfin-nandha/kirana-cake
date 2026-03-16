import store from "@/data/store.json";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-heading dark:bg-brand-dark-surface border-t border-brand-highlight/20 dark:border-brand-dark-border py-10 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt={store.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                        />
                        <span className="text-brand-highlight dark:text-brand-dark-text font-semibold">
                            {store.name}
                        </span>
                    </div>

                    {/* Copyright */}
                    <p className="text-brand-highlight/50 dark:text-brand-dark-muted text-sm text-center">
                        © {currentYear} {store.name}. All rights reserved.
                    </p>

                    {/* Links */}
                    <div className="flex items-center gap-5 text-sm">
                        <Link href="/products" className="text-brand-highlight/60 dark:text-brand-dark-muted hover:text-brand-highlight transition-colors">
                            Produk
                        </Link>
                        <span className="text-brand-highlight/20">|</span>
                        <a href={store.tokopediaUrl} target="_blank" rel="noopener noreferrer" className="text-brand-highlight/60 dark:text-brand-dark-muted hover:text-brand-highlight transition-colors">
                            Tokopedia
                        </a>
                        <span className="text-brand-highlight/20">|</span>
                        <a href={`https://wa.me/${store.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-brand-highlight/60 dark:text-brand-dark-muted hover:text-brand-highlight transition-colors">
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
