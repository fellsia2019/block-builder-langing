import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlockBuilder - Блочный конструктор с чистой архитектурой",
  description: "Библиотека для создания блочных конструкторов с правильной чистой архитектурой. Поддержка Vue3, Pure JavaScript и TypeScript.",
  keywords: ["block-builder", "no-code", "constructor", "vue3", "typescript", "clean architecture"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}

