import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProviders } from "@/components/providers/convex-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JNotei",
  description: "Work space better, faster, and easier.",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/logo.svg",
      href: "/logo.svg",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/logo.svg",
      href: "/logo.svg",
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProviders>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="notei-theme-2">
          <Toaster position="bottom-center"/>
          {children}
        </ThemeProvider>
        </ConvexClientProviders>
      </body>
    </html>
  );
}
