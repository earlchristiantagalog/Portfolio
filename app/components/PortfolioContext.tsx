"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { defaultData, type PortfolioData } from "@/app/data/portfolio-data";
import { loadPortfolioData, savePortfolioData } from "@/app/lib/portfolio-service";

const PortfolioContext = createContext<{
  data: PortfolioData;
  loading: boolean;
  updateSection: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  resetData: () => void;
}>({
  data: defaultData,
  loading: true,
  updateSection: () => {},
  resetData: () => {},
});

export function usePortfolio() {
  return useContext(PortfolioContext);
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

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
      let snapshot: PortfolioData;
      setData((prev) => {
        snapshot = { ...prev, [key]: value };
        return snapshot;
      });
      const token = await getToken();
      await savePortfolioData(snapshot!, token);
    },
    [getToken]
  );

  const resetData = useCallback(async () => {
    setData(defaultData);
    const token = await getToken();
    await savePortfolioData(defaultData, token);
  }, [getToken]);

  return (
    <PortfolioContext.Provider value={{ data, loading, updateSection, resetData }}>
      {children}
    </PortfolioContext.Provider>
  );
}
