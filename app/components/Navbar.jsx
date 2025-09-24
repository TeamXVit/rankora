"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-black/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            
            <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent hover:from-indigo-400 hover:to-purple-400 transition-all duration-300">
              Rankora
            </Link>
          </div>

          {/* Auth Section */}
          {status === "loading" ? (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-indigo-500"></div>
              <span className="text-gray-300 text-sm hidden sm:inline">Loading...</span>
            </div>
          ) : !session ? (
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-lg text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="hidden sm:inline">Sign in with Google</span>
              <span className="sm:hidden">Sign in</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              {/* User Profile */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
                {session.user?.image && (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || "User"}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full"
                  />
                )}
                <span className="text-white font-medium text-sm hidden sm:block max-w-32 truncate">
                  {session.user?.name}
                </span>
              </div>
              
              {/* Sign Out */}
              <button
                onClick={() => signOut()}
                className="px-3 py-2 sm:px-4 sm:py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300 text-sm"
              >
                <span className="hidden sm:inline">Sign Out</span>
                <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
