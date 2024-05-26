import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import CommonRootLayout from "@/components/CommonRootLayout";

export const metadata: Metadata = {
  title: "Next Wordpress",
  description: "Assignment on Next.Js with headless wordpress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CommonRootLayout>{children}</CommonRootLayout>;
}
