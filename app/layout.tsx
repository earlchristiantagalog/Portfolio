import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { PortfolioProvider } from "./components/PortfolioContext";
import { MetaHead } from "./components/MetaHead";
import { SiteBackdrop } from "./components/effects/SiteBackdrop";
import { CursorAura } from "./components/effects/CursorAura";
import { defaultData } from "@/server/portfolio/defaults";
import { getPortfolio } from "@/server/portfolio/repository";
import { databaseErrorCategory } from "@/server/db/diagnostics";

export const dynamic = "force-dynamic";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Professional portfolio of John Doe — Full-Stack Developer specializing in modern web experiences.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialData = defaultData;
  try {
    initialData = (await getPortfolio()) ?? defaultData;
  } catch (error) {
    console.error("Unable to load portfolio for initial render:", databaseErrorCategory(error));
  }
  return (
      <html
        lang="en"
        data-scroll-behavior="smooth"
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
        suppressHydrationWarning
      >
        <body className="min-h-full font-sans">
          <SiteBackdrop />
          <CursorAura />
          <a
            href="#main"
            className="label clip-corner-sm absolute left-4 top-4 z-[100] -translate-y-24 border border-primary/40 bg-card px-4 py-3 text-foreground transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <ThemeProvider>
            <PortfolioProvider initialData={initialData} defaultData={defaultData}>
              <MetaHead />
              <div id="content" className="relative z-10 flex min-h-dvh flex-col">
                {children}
              </div>
            </PortfolioProvider>
          </ThemeProvider>
        </body>
      </html>
  );
}
