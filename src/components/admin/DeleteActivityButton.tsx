"use client";

import { useRouter } from "next/navigation";
import { useStatus } from "@/components/ui/StatusProvider";

export default function DeleteActivityButton({ activityId }: { activityId: number }) {
    const router = useRouter();
    const { showToast, confirm, setLoading } = useStatus();

    const handleDelete = async () => {
        const ok = await confirm({
            title: "Hapus Aktivitas",
            message: "Apakah Anda yakin ingin menghapus aktivitas ini? Tindakan ini tidak dapat dibatalkan.",
            confirmText: "Ya, Hapus",
            cancelText: "Batal"
        });

        if (!ok) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/admin/activities/${activityId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                showToast("Aktivitas berhasil dihapus", "success");
                router.refresh();
            } else {
                showToast("Gagal menghapus aktivitas", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Terjadi kesalahan sistem", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
            title="Delete"
        >
            🗑️
        </button>
    );
}
