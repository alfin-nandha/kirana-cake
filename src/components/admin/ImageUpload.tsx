"use client";

import { useState, useRef } from "react";
import { useStatus } from "@/components/ui/StatusProvider";

interface ImageUploadProps {
    onUploadSuccess: (url: string) => void;
    label?: string;
    type?: "products" | "activities";
}

export default function ImageUpload({ onUploadSuccess, label = "Upload Gambar", type = "products" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const { showToast } = useStatus();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                onUploadSuccess(data.url);
                showToast("Gambar berhasil diupload", "success");
            } else {
                showToast("Upload gagal. Silahkan coba lagi.", "error");
            }
        } catch (err) {
            console.error(err);
            showToast("Terjadi kesalahan saat upload", "error");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div>
            <label className="block text-sm font-bold text-brand-heading dark:text-brand-highlight mb-2 uppercase tracking-widest text-[10px]">
                {label}
            </label>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-brand-highlight/10 hover:bg-brand-highlight/20 text-brand-heading dark:text-brand-highlight px-6 py-2.5 rounded-xl text-sm font-semibold border border-brand-highlight/30 transition-all disabled:opacity-50"
                >
                    {uploading ? "Mengupload..." : "Pilih File"}
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
                <span className="text-[10px] text-brand-text/40 italic">Maks. 5MB (JPG, PNG, WebP)</span>
            </div>
        </div>
    );
}
