import "./globals.css";
import type { Metadata } from "next";
import { Inter, Source_Sans_3, Noto_Sans_SC } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/CustomUI/custom-nav";
import Background from "@/components/CustomUI/background";

// 定义网站字体
const inter = Inter({ subsets: ["latin"] });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });
const notoSansSC = Noto_Sans_SC({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "喵喵英语-TheEchoMethod",
  description: "回音法是一种英语学习方法，通过听、回忆、模仿来提高英语口语",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansSC.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Background />
          <Nav />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
