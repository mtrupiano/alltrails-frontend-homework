import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope500 = Manrope({ weight: "500" });

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
