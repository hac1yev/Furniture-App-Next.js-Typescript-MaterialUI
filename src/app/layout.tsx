import type { Metadata } from "next";
import { Inter, Prata } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AppProvider from "@/components/AppProvider";

const inter = Inter({ weight: '400', subsets: ["latin"] });
const prata = Prata({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Decor",
  description: "THE FURNITURE THAT DEFINES YOU",
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
        <body className={`${inter.className} ${prata.className}`}>
          <AppProvider>
            <Header />
            {children}
            <Footer />
          </AppProvider>
        </body>
    </html>
  );
}
