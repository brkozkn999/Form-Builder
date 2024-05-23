import "./globals.css";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "AI Form Builder",
  description: "made by brkozkn999",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme='light'>
        <body className={montserrat.className}>
            <Header/>  
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
