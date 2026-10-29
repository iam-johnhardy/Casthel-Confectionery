
import type { Metadata } from "next";
import { CartProvider } from "@/component/cart-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casthel Confectionery | Little Moments, Beautiful Treats",
  description:
    "Discover handcrafted chocolates, delightful cakes, and thoughtful gifts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
