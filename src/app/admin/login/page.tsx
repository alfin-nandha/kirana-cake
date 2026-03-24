"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                router.push("/admin/products");
            } else {
                const data = await res.json();
                setError(data.message || "Login failed");
            }
        } catch (_err) {
            console.error("Login Error:", _err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-bg dark:bg-brand-dark-bg p-6 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-brand-dark-surface p-8 rounded-2xl shadow-xl border border-brand-highlight/20">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-brand-heading dark:text-brand-highlight mb-2">
                        Kirana Cake <span className="text-brand-button">Admin</span>
                    </h1>
                    <p className="text-brand-text/60 dark:text-brand-dark-muted text-sm">
                        Enter your credentials to manage the shop
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-brand-heading dark:text-brand-highlight mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-button transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-brand-heading dark:text-brand-highlight mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-brand-highlight/30 dark:bg-brand-dark-bg dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-button transition-all"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-button hover:bg-brand-button/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-button/20 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
