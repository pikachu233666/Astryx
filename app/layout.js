import "./globals.css";

export const metadata = {
  title: "ZodiaScope AI",
  description: "BaZi Four Pillars meets Western Astrology powered by AI"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
