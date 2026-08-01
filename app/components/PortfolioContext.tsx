"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { defaultData, type PortfolioData } from "@/app/data/portfolio-data";
import { loadPortfolioData, savePortfolioData } from "@/app/lib/portfolio-service";

const STORAGE_KEY = "portfolio-data";
const PORTFOLIO_EVENT = "portfolio-data-change";

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

function getLocalSnapshot(): PortfolioData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  } catch {
    return defaultData;
  }
}

function setLocalData(data: PortfolioData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(PORTFOLIO_EVENT));
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  // Initial load: Express API -> localStorage -> defaults
  useEffect(() => {
    async function init() {
      const apiData = await loadPortfolioData();
      if (apiData) {
        setData(apiData);
        setLocalData(apiData);
      } else {
        setData(getLocalSnapshot());
      }
      setLoading(false);
    }
    init();
  }, []);

  // Listen for localStorage changes (other tabs)
  useEffect(() => {
    const handler = () => setData(getLocalSnapshot());
    window.addEventListener("storage", handler);
    window.addEventListener(PORTFOLIO_EVENT, handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener(PORTFOLIO_EVENT, handler);
    };
  }, []);

  const updateSection = useCallback(
    async <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
      setData((prev) => {
        const next = { ...prev, [key]: value };
        setLocalData(next);
        return next;
      });
      const token = await getToken();
      const snapshot = { ...data, [key]: value };
      savePortfolioData(snapshot, token);
    },
    [getToken, data]
  );

  const resetData = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
    const token = await getToken();
    savePortfolioData(defaultData, token);
    window.dispatchEvent(new CustomEvent(PORTFOLIO_EVENT));
  }, [getToken]);

  return (
    <PortfolioContext.Provider value={{ data, loading, updateSection, resetData }}>
      {children}
    </PortfolioContext.Provider>
  );
}
