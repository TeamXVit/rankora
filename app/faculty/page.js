import FacultyList from "./FacultyList";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";

async function getFacultyData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data.json`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to load data.json");
  }
  return res.json();
}

export default async function FacultyPage() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/error?error=Please login to access this page");
  // }
  const data = await getFacultyData();
  const faculties = data.data;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Faculty Directory
        </h1>
        <FacultyList faculties={faculties} />
      </div>
    </div>
  );
}
