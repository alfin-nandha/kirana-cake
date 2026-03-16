"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const isDark = saved === "dark";
        setDark(isDark);
    }, []);

    function toggle() {
        const html = document.documentElement;
        if (dark) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDark(false);
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDark(true);
        }
    }

    return (
        <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
        bg-brand-highlight/30 hover:bg-brand-highlight/60 text-brand-heading
        dark:bg-brand-dark-surface dark:hover:bg-brand-dark-border dark:text-brand-highlight
        border border-brand-highlight/40 dark:border-brand-dark-border"
        >
            {dark ? (
                /* Sun icon */
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                    />
                </svg>
            ) : (
                /* Moon icon */
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                    />
                </svg>
            )}
        </button>
    );
}
