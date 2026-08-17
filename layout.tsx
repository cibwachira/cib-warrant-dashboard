import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Warrant Management V2",
  description: "Warrant checklist and investigation dashboard prototype",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
