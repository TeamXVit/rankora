"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Left side - logo */}
      <Link href="/" className="text-xl font-bold text-indigo-600">
        Rankora
      </Link>

      {/* Right side - session controls */}
      {status === "loading" ? (
        <p className="text-gray-500">Loading...</p>
      ) : !session ? (
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Sign in
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">
            {session.user?.name}
          </span>
          <button
            onClick={() => signOut()}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
}
