import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

export const metadata = {
  title: "Campus++",
  description: "Campus++ help to devlop new skills for Student.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <Toaster position="top-left" expand={false} richColors />
        <NextTopLoader/>
        {children}
      </body>
    </html>
  );
}
