import "./globals.css";

export const metadata = {
  title: "Astryx",
  description: "Eastern and Western astrology combined for interpretation"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
