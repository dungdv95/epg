import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";
import { ErrorConfirm } from "@/components/notice/confirm-error";
import { Confirmer } from "@/components/notice/confirm";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NPS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>
            <Providers>{children}</Providers>
            <Toaster />
            <ErrorConfirm />
            <Confirmer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
