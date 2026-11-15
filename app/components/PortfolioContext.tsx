"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { PortfolioData } from "@/app/data/portfolio-data";
import { loadPortfolioData, savePortfolioData, savePortfolioSection } from "@/app/lib/portfolio-service";

const PortfolioContext = createContext<{
  data: PortfolioData;
  loading: boolean;
  updateSection: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => Promise<boolean>;
  resetData: () => Promise<boolean>;
}>({
  data: null as unknown as PortfolioData,
  loading: true,
  updateSection: async () => false,
  resetData: async () => false,
});

export function usePortfolio() {
  return useContext(PortfolioContext);
}

export function PortfolioProvider({ children, initialData }: { children: React.ReactNode; initialData: PortfolioData }) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const apiData = await loadPortfolioData();
      if (apiData) {
        setData(apiData);
      }
      setLoading(false);
    }
    init();
  }, []);

  const updateSection = useCallback(
    async <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
      const success = await savePortfolioSection(key, value);
      if (success) setData((previous) => ({ ...previous, [key]: value }));
      return success;
    },
    []
  );

  const resetData = useCallback(async () => {
    const success = await savePortfolioData(initialData);
    if (success) setData(initialData);
    return success;
  }, [initialData]);

  return (
    <PortfolioContext.Provider value={{ data, loading, updateSection, resetData }}>
      {children}
    </PortfolioContext.Provider>
  );
}
