import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import AuthProvider from "@/services/AuthProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "CarDoc",
    template: "%s | CarDoc",
  },
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
        <Toaster
          position="top-center"
          closeButton
          className="flex justify-center"
          toastOptions={{
            style: {
              color: "#ff3811",
              width: "fit-content",
            },
          }}
        />

        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}