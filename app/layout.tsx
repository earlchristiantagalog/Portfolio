import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { PortfolioProvider } from "./components/PortfolioContext";
import { MetaHead } from "./components/MetaHead";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Professional portfolio of John Doe — Full-Stack Developer specializing in modern web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${poppins.variable} h-full antialiased dark`} suppressHydrationWarning>
        <body className="min-h-full flex flex-col font-sans">
          <ThemeProvider>
            <PortfolioProvider>
              <MetaHead />
              {children}
            </PortfolioProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
