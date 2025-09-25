"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "Something went wrong";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg rounded-lg p-6 max-w-md text-center">
        <h1 className="text-2xl font-bold text-white-600 mb-4">Access Denied</h1>
        <p className="text-white-700 mb-6">{error}</p>
        <Link
          href="/"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
