"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { defaultData, type PortfolioData } from "@/app/data/portfolio-data";

const STORAGE_KEY = "portfolio-data";
const PORTFOLIO_EVENT = "portfolio-data-change";

const PortfolioContext = createContext<{
  data: PortfolioData;
  updateSection: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  resetData: () => void;
}>({
  data: defaultData,
  updateSection: () => {},
  resetData: () => {},
});

export function usePortfolio() {
  return useContext(PortfolioContext);
}

function subscribe(callback: () => void) {
  const handler = () => callback();
  window.addEventListener(PORTFOLIO_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(PORTFOLIO_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

function getSnapshot(): string {
  if (typeof window === "undefined") return JSON.stringify(defaultData);
  return localStorage.getItem(STORAGE_KEY) ?? JSON.stringify(defaultData);
}

function getServerSnapshot(): string {
  return JSON.stringify(defaultData);
}

function parseData(raw: string): PortfolioData {
  try {
    return { ...defaultData, ...JSON.parse(raw) };
  } catch {
    return defaultData;
  }
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const data = useMemo(() => parseData(raw), [raw]);

  const updateSection = useCallback(
    <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
      const current = parseData(getSnapshot());
      const next = { ...current, [key]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent(PORTFOLIO_EVENT));
    },
    []
  );

  const resetData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(PORTFOLIO_EVENT));
  }, []);

  const value = useMemo(
    () => ({ data, updateSection, resetData }),
    [data, updateSection, resetData]
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}
