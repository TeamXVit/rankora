import "./globals.css";
import Providers from "./providers";
import Navbar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Rankora",
  description:
    "Rankora : VIT-AP's Faculty Ranker made by students, for students.",
  keywords: [
    "VIT-AP",
    "faculty",
    "ratings",
    "student reviews",
    "courses",
    "ranker",
    "VIT",
  ],
  authors: [
    { name: "Ganesh M", url: "https://github.com/prodev717" },
    { name: "V K Rohith", url: "https://github.com/RohiVK" },
  ],
  verification: {
    google: "NE_NZzYugJBp2hjpi9Q4VaLLKJpwrpdPl5h8mTLl4tc",
    other: {
      'msvalidate.01': ['04102198BCF044821D5073099AF93C42'],
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden">
        {/* Animated Gradient Background - Tailwind Only */}
        <div className="fixed inset-0 z-0">
          {/* Main animated gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 animate-pulse"></div>

          {/* Layered animated gradients with delays */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-purple-900/15 animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "3s" }}
          ></div>
          <div
            className="absolute inset-0 bg-gradient-to-bl from-pink-900/10 via-transparent to-blue-900/12 animate-pulse"
            style={{ animationDelay: "2s", animationDuration: "4s" }}
          ></div>
          <div
            className="absolute inset-0 bg-gradient-to-tl from-purple-900/8 via-transparent to-indigo-900/10 animate-pulse"
            style={{ animationDelay: "3s", animationDuration: "5s" }}
          ></div>

          {/* Floating animated orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-pink-500/12 rounded-full blur-3xl animate-bounce"
            style={{ animationDuration: "8s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/12 via-pink-500/8 to-indigo-500/10 rounded-full blur-3xl animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "10s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/10 via-indigo-500/8 to-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s", animationDuration: "6s" }}
          ></div>

          {/* Additional moving elements */}
          <div
            className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl animate-ping"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-2xl animate-ping"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          ></div>

          {/* Animated wave overlays */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute w-full h-full bg-gradient-to-r from-transparent via-indigo-400/8 to-transparent transform -skew-x-12 animate-pulse"
              style={{ animationDuration: "7s" }}
            ></div>
            <div
              className="absolute w-full h-full bg-gradient-to-l from-transparent via-purple-400/6 to-transparent transform skew-x-12 animate-pulse"
              style={{ animationDelay: "3s", animationDuration: "8s" }}
            ></div>
          </div>
        </div>

        <Providers>
          <Navbar />
          <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 pt-8">
            {children}
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
}
