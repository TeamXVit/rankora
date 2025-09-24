"use client";

import { Suspense } from "react";
import AuthErrorContent from "./AuthErrorContent";

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <AuthErrorContent />
    </Suspense>
  );
}
