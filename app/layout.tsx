import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "YourMail — Private Email",
    template: "%s — YourMail",
  },
  description: "Fast, private and secure email.",
  applicationName: "YourMail",
  keywords: [
    "email",
    "private email",
    "secure email",
    "encrypted email",
    "YourMail",
  ],
  robots: {
    index: true,
    follow: true,
  },
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
