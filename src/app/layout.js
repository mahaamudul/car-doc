import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import AuthProvider from "@/services/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Car Doctor Pro",
  description: "Car repair and maintenance services",
};

export default function RootLayout({ children }) {
  return (
    <html
     data-theme="cardoc"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
        <body className="min-h-full flex flex-col">
      <AuthProvider>

        <Navbar></Navbar>
         {children}
        <Footer></Footer>
        </AuthProvider>
      </body>
      
    </html>
  );
}
