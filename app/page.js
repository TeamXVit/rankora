"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <style jsx global>{`
        html,
        body {
          overflow: hidden !important;
          height: 100vh !important;
          position: fixed !important;
          width: 100% !important;
        }
      `}</style>

      <div className="h-screen w-screen overflow-hidden fixed inset-0 flex flex-col">
        {/* Main Content Container */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 pb-20 md:pb-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Rankora
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
                VIT-AP Faculty Directory made by students, for students
              </p>
            </div>

            {/* Button */}
            <div className="mb-6 md:mb-8">
              <Link
                href="/faculty"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-medium text-base sm:text-lg rounded-2xl hover:bg-indigo-600/80 hover:border-indigo-500/50 transition-all duration-300 group"
              >
                <span>Browse Faculty Directory</span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Mobile Disclaimer */}
            <div className="md:hidden">
              <div className="bg-gradient-to-r from-gray-800/50 via-gray-700/40 to-gray-800/50 backdrop-blur-2xl border border-gray-600/30 rounded-2xl p-4 max-w-sm mx-auto shadow-2xl">
                <div className="text-center space-y-2">
                  <h4 className="text-sm font-bold text-white">
                    Student Initiative
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Independent platform by students, for students. Not
                    affiliated with VIT-AP. Use for academic guidance only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Mobile Footer */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/5 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="px-3 py-2">
            <div className="flex items-center justify-between text-xs">
              {/* Left Side - TeamX & Developers */}
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">TeamX</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-300">
                  <a
                    href="https://github.com/prodev717"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-white"
                  >
                    Ganesh M
                  </a>
                  ,{" "}
                  <a
                    href="https://github.com/RohiVK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-white"
                  >
                    V K Rohith
                  </a>
                </span>
              </div>

              {/* Right Side - Social Links */}
              <div className="flex items-center gap-2">
                <span className="text-gray-300 font-bold">Connect:</span>
                <a
                  href="https://instagram.com/teamx.vit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.40-1.439-1.40z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/TeamXVit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.30.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Non-Sticky Desktop Footer */}
        <div className="hidden md:block bg-white/5 backdrop-blur-2xl border-t border-white/10">
          <div className="px-6 py-4">
            <div className="grid grid-cols-3 gap-6 items-center max-w-7xl mx-auto">
              {/* Left - Disclaimer */}
              <div className="text-left">
                <p className="text-sm text-gray-300 font-medium">
                  Independent Platform
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Not affiliated with VIT-AP University • Use for academic
                  guidance only
                </p>
              </div>

              {/* Center - TeamX */}
              <div className="text-center">
                <p className="text-sm text-gray-200 font-medium">
                  <span className="font-bold text-white">
                    Developed by TeamX
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  <a
                    href="https://github.com/prodev717"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-white"
                  >
                    Ganesh M
                  </a>
                  ,{" "}
                  <a
                    href="https://github.com/RohiVK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-white"
                  >
                    V K Rohith
                  </a>
                </p>
              </div>

              {/* Right - Social Links */}
              <div className="flex justify-end items-center gap-1">
                <span className="text-xs text-gray-400 mr-3 font-bold">
                  Connect:
                </span>
                <a
                  href="https://instagram.com/teamx.vit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-pink-400 hover:bg-pink-400/10 rounded-lg transition-all duration-200"
                  title="Instagram"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.40-1.439-1.40z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/TeamXVit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  title="GitHub"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.30.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
