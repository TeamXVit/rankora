import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const fetchFacultyData = async (id) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data.json`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to load data.json");

  const { data } = await res.json();
  return data.find((item) => String(item.id) === String(id));
};

export default async function RatePage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(
      "/auth/error?error=Only VIT-AP student email login are allowed to rate faculty"
    );
  }

  const { id } = await params; // ✅ no await
  const faculty = await fetchFacultyData(id);

  if (!faculty) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Faculty not found
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {JSON.stringify(faculty)}
    </div>
  );
}
