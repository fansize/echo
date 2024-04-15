import "./globals.css";
import type { Metadata } from "next";
import { Inter, Source_Sans_3, Noto_Sans_SC } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// 定义网站字体
const inter = Inter({ subsets: ["latin"] });
const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });
const notoSansSC = Noto_Sans_SC({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "喵喵英语-回音法学英语 TheEchoMethod",
  description: "回音法是一种英语学习方法，通过听、回忆、模仿来提高英语口语",
  metadataBase: new URL("https://echoenglish.pro/"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "喵喵英语-回音法学英语 TheEchoMethod",
    card: "summary_large_image",
    images: "/capture.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="baidu-site-verification" content="codeva-eTgVIIFd2J" />
      </head>
      <link rel="icon" type="image/png" sizes="32x32" href="/logo.svg" />
      <body className={`${notoSansSC.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
