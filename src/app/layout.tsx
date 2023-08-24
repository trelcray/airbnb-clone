import type { Metadata } from "next";
import { Inter } from "next/font/google";

import getCurrentUser from "@/actions/get-current-user";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { ModalProvider } from "@/providers/modal-provider";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://trelcray-airbnb-clone.vercel.app"),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "Airbnb",
    "Web Development",
    "Software Developer",
    "Frontend Developer",
  ],
  authors: [
    {
      name: "thaliszambarda",
      url: siteConfig.url,
    },
  ],
  creator: "thaliszambarda",
  themeColor: "black",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@ThalisZambarda",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar currentUser={currentUser} />
        <ModalProvider />
        <main className="pb-20 pt-28">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
