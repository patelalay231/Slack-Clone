import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Lato } from "next/font/google";
import "@/styles/globals.css";

const lato = Lato({
  subsets : ['latin'],
  weight : ['100' ,'300' , '400' , '700' , '900'],
})

export const metadata: Metadata = {
  title: "Slack",
  description: "Slack clone by alay",
};

export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
