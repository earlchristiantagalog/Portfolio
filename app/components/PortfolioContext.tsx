"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
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
  const version = useRef(0);
  const refreshVersion = useRef(0);
  const channel = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    let active = true;
    async function refresh() {
      const startedAt = version.current;
      const requestId = ++refreshVersion.current;
      const apiData = await loadPortfolioData();
      if (!active) return;
      if (apiData && startedAt === version.current && requestId === refreshVersion.current) {
        setData((current) => {
          const next = { ...current };
          let changed = false;
          for (const key of Object.keys(apiData) as (keyof PortfolioData)[]) {
            if (JSON.stringify(current[key]) !== JSON.stringify(apiData[key])) {
              Object.assign(next, { [key]: apiData[key] });
              changed = true;
            }
          }
          return changed ? next : current;
        });
      }
      setLoading(false);
    }
    void refresh();
    if ("BroadcastChannel" in window) {
      channel.current = new BroadcastChannel("portfolio-updates");
      channel.current.onmessage = () => void refresh();
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === "portfolio-updated") void refresh();
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", onVisible);
    const interval = window.setInterval(onVisible, 5000);
    return () => {
      active = false;
      channel.current?.close();
      channel.current = null;
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(interval);
    };
  }, []);

  const announceUpdate = useCallback(() => {
    channel.current?.postMessage("updated");
    try {
      localStorage.setItem("portfolio-updated", String(Date.now()));
    } catch {
      // Cross-tab storage can be disabled; polling remains available.
    }
  }, []);

  const updateSection = useCallback(
    async <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
      version.current++;
      const success = await savePortfolioSection(key, value);
      version.current++;
      if (success) {
        setData((previous) => ({ ...previous, [key]: value }));
        announceUpdate();
      }
      return success;
    },
    [announceUpdate]
  );

  const resetData = useCallback(async () => {
    version.current++;
    const success = await savePortfolioData(initialData);
    version.current++;
    if (success) {
      setData(initialData);
      announceUpdate();
    }
    return success;
  }, [announceUpdate, initialData]);

  return (
    <PortfolioContext.Provider value={{ data, loading, updateSection, resetData }}>
      {children}
    </PortfolioContext.Provider>
  );
}
