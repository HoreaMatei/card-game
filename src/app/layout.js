import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { MedievalSharp } from "next/font/google";
const medieval = MedievalSharp({ subsets: ["latin"], weight: "400" });
export const metadata = {
  title: "LOTR card game",
  description: "LOTR card game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={medieval.className}>{children}</body>
    </html>
  );
}
