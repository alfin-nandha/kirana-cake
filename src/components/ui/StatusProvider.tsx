"use client";

import React, { createContext, useContext, useState } from "react";
import { CheckCircle, AlertCircle, Info, Loader2, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ConfirmOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

interface StatusContextType {
    showToast: (message: string, type: ToastType) => void;
    confirm: (options: ConfirmOptions) => Promise<boolean>;
    setLoading: (loading: boolean) => void;
    isLoading: boolean;
}

const StatusContext = createContext<StatusContextType | null>(null);

export function useStatus() {
    const context = useContext(StatusContext);
    if (!context) throw new Error("useStatus must be used within StatusProvider");
    return context;
}

export default function StatusProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [confirmState, setConfirmState] = useState<{
        options: ConfirmOptions;
        resolve: (value: boolean) => void;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const showToast = (message: string, type: ToastType) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    };

    const confirm = (options: ConfirmOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            setConfirmState({ options, resolve });
        });
    };

    const handleConfirm = (value: boolean) => {
        if (confirmState) {
            confirmState.resolve(value);
            setConfirmState(null);
        }
    };

    return (
        <StatusContext.Provider value={{ showToast, confirm, setLoading: setIsLoading, isLoading }}>
            {children}

            {/* Global Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-bg/60 backdrop-blur-sm transition-all animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-brand-dark-surface p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-brand-highlight/20 scale-110">
                        <Loader2 className="w-12 h-12 text-brand-button animate-spin" />
                        <p className="font-bold text-brand-heading dark:text-brand-highlight tracking-widest uppercase text-xs">Sedang Memproses...</p>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            <div className="fixed top-6 right-6 z-[10000] flex flex-col gap-4 max-w-md w-full">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`flex items-center gap-4 p-4 rounded-2xl shadow-xl border animate-in slide-in-from-right duration-500 
                            ${toast.type === "success" ? "bg-green-50 border-green-100 text-green-800" :
                                toast.type === "error" ? "bg-red-50 border-red-100 text-red-800" :
                                    "bg-blue-50 border-blue-100 text-blue-800"}`}
                    >
                        {toast.type === "success" && <CheckCircle className="w-6 h-6 shrink-0 text-green-500" />}
                        {toast.type === "error" && <AlertCircle className="w-6 h-6 shrink-0 text-red-500" />}
                        {toast.type === "info" && <Info className="w-6 h-6 shrink-0 text-blue-500" />}

                        <p className="text-sm font-semibold flex-1">{toast.message}</p>

                        <button
                            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                            className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4 opacity-50" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Confirmation Modal */}
            {confirmState && (
                <div className="fixed inset-0 z-[10001] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-brand-dark-surface max-w-sm w-full p-8 rounded-[2rem] shadow-2xl border border-brand-highlight/20 transform animate-in zoom-in-95 duration-300">
                        <h3 className="text-xl font-bold text-brand-heading dark:text-brand-highlight mb-4">{confirmState.options.title}</h3>
                        <p className="text-brand-text/70 dark:text-brand-dark-muted mb-8 leading-relaxed">{confirmState.options.message}</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleConfirm(false)}
                                className="flex-1 px-6 py-3 rounded-2xl border border-brand-highlight/30 font-bold text-brand-heading dark:text-brand-highlight hover:bg-brand-highlight/10 transition-all"
                            >
                                {confirmState.options.cancelText || "Batal"}
                            </button>
                            <button
                                onClick={() => handleConfirm(true)}
                                className="flex-1 px-6 py-3 rounded-2xl bg-brand-button text-white font-bold hover:bg-brand-button/90 transition-all shadow-lg shadow-brand-button/20"
                            >
                                {confirmState.options.confirmText || "Ya, Lanjutkan"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </StatusContext.Provider>
    );
}
