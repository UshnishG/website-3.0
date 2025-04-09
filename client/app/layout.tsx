import "./globals.css";
import { Playfair_Display } from "next/font/google";
import type React from "react";
import { ThemeProvider } from "@/components/ThemeProvider/page";
import ScrollToTopButton from "@/components/ScrollToTopButton/page"; // Import ScrollToTopButton

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
        <ThemeProvider>
          {children}
          <ScrollToTopButton /> {/* Always available on all pages */}
        </ThemeProvider>
      </body>
    </html>
  );
}
