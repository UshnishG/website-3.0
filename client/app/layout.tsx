import "./globals.css";
import { Playfair_Display } from "next/font/google";
import type React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.className} antialiased`}>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}