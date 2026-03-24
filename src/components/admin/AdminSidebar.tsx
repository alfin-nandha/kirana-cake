"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStatus } from "@/components/ui/StatusProvider";
import {
    ShoppingBag,
    Calendar,
    PhoneCall,
    Star,
    LogOut,
    LayoutDashboard
} from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();
    const { confirm, showToast, setLoading } = useStatus();

    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Produk", href: "/admin/products", icon: ShoppingBag },
        { name: "Activities/News", href: "/admin/activities", icon: Calendar },
        { name: "Kontak & Sosmed", href: "/admin/contact", icon: PhoneCall },
        { name: "Ulasan", href: "/admin/reviews", icon: Star },
    ];

    const handleLogout = async () => {
        const ok = await confirm({
            title: "Konfirmasi Logout",
            message: "Apakah Anda yakin ingin keluar dari panel admin?",
            confirmText: "Ya, Keluar",
            cancelText: "Batal"
        });

        if (!ok) return;

        setLoading(true);
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            showToast("Anda telah keluar", "info");
            window.location.href = "/admin/login";
        } catch (err) {
            console.error("Logout error:", err);
            showToast("Terjadi kesalahan saat logout", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="w-64 bg-white dark:bg-brand-dark-surface border-r border-brand-highlight/10 flex flex-col h-screen sticky top-0 transition-colors">
            <div className="p-8">
                <h1 className="text-xl font-bold text-brand-heading dark:text-brand-highlight">
                    Kirana <span className="text-brand-button">Admin</span>
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const active = item.name === "Dashboard" ? pathname === "/admin" : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active
                                ? "bg-brand-button text-white shadow-lg shadow-brand-button/20"
                                : "text-brand-text/60 dark:text-brand-dark-muted hover:bg-brand-highlight/10 hover:text-brand-heading dark:hover:text-brand-highlight"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-brand-highlight/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all font-medium text-sm"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
