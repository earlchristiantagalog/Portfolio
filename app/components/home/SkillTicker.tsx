"use client";

import { usePortfolio } from "../PortfolioContext";
import { TechTicker } from "../ui/TechTicker";

export function SkillTicker() {
  const { data } = usePortfolio();
  return <TechTicker items={data.about.skills} />;
}
