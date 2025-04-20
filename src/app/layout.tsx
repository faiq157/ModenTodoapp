import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import Footer from "@/components/layout/Footer";
import ClientSessionProvider from "@/components/providers/ClientSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskMaster - Elegant Task Management",
  description:
    "TaskMaster is an elegant productivity app that helps you organize your tasks, focus on what matters, and achieve more every day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <ClientSessionProvider> {/* Use the client-side session provider here */}
              <main className="flex-grow">{children}</main>
            </ClientSessionProvider>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
