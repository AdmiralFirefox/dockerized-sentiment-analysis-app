import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import Navbar from "./components/Navbar";
import "@/styles/globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--poppins",
});

export const metadata: Metadata = {
  title: "Sentiment Analysis",
  description: "Sentiment analysis final project for our NLP subject",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
          <QueryProvider>
            <Navbar />
            {children}
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
