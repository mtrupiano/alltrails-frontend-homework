import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope500 = Manrope({ weight: "500" });

export const metadata: Metadata = {
  title: "AllTrails at lunch",
  description: "AllTrails frontend homework, simple restaurant search",
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
