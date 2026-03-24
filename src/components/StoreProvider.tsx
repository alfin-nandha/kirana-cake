"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface StoreConfig {
    name: string;
    tagline: string;
    description: string;
    whatsappNumber: string;
    whatsappMessage: string;
    tokopediaUrl: string;
    shopeeUrl?: string;
    tiktokUrl?: string;
    instagram: string;
    mapsUrl: string;
    fullAddress: string;
    rating: number;
    reviewCount: number;
    soldCount: number;
    lat: number;
    lng: number;
    showHero: boolean;
    showStats: boolean;
    showProducts: boolean;
    showNews: boolean;
    showAbout: boolean;
    showReviews: boolean;
    showContact: boolean;
}

const StoreContext = createContext<StoreConfig | null>(null);

export function useStore() {
    const context = useContext(StoreContext);
    if (!context) {
        return null;
    }
    return context;
}

export default function StoreProvider({
    children,
    initialConfig
}: {
    children: React.ReactNode;
    initialConfig: StoreConfig;
}) {
    const [config, setConfig] = useState<StoreConfig>(initialConfig);

    return (
        <StoreContext.Provider value={config}>
            {children}
        </StoreContext.Provider>
    );
}
