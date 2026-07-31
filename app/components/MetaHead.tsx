"use client";

import { useEffect } from "react";
import { usePortfolio } from "@/app/components/PortfolioContext";

export function MetaHead() {
  const { data } = usePortfolio();

  useEffect(() => {
    document.title = data.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", data.meta.description);
    } else {
      const el = document.createElement("meta");
      el.setAttribute("name", "description");
      el.setAttribute("content", data.meta.description);
      document.head.appendChild(el);
    }
  }, [data.meta.title, data.meta.description]);

  return null;
}
