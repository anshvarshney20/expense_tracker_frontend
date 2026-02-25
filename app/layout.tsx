
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Æquitas | Premium AI Expense Intelligence",
  description: "Take control of your finances with AI-powered goal-based expense tracking.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#02040a" />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          inter.variable,
          outfit.variable,
          "antialiased bg-[#02040a] text-foreground min-h-screen font-sans selection:bg-primary/30 selection:text-primary"
        )}
      >
        <QueryProvider>
          {children}
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              className: "glass border-white/10 !text-white font-bold rounded-2xl",
              style: {
                background: "rgba(10, 15, 30, 0.8)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "white",
              },
              descriptionClassName: "!text-white/70",
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
