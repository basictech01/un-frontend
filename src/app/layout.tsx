import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ApolloProvider } from "@/providers/ApolloProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Uttrakhand News - Admin Panel",
  description: "Editorial platform for Uttrakhand news and articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
