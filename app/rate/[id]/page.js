import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import StarRatingForm from "./StarRatingForm";
import Link from "next/link";

const fetchFacultyData = async (id) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data.json`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to load data.json");
  const { data } = await res.json();
  return data.find((item) => String(item.id) === id);
};

export default async function RatePage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(
      "/auth/error?error=Only VIT-AP student email login are allowed to rate faculty"
    );
  }

  const { id } = await params;
  const faculty = await fetchFacultyData(id);
  await dbConnect();

  if (!faculty) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-400 mb-2">Faculty Not Found</h2>
          <p className="text-gray-400">The faculty member you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header with Back Button */}
        <div className="sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-4 py-4 sm:px-6">
            <Link
              href={`/faculty/${id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-2">
              Rate Faculty
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">Share your experience with this professor</p>
          </div>

          {/* Faculty Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl mb-6">
            <div className="p-6 sm:p-8">
              {/* Faculty Profile */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                {/* Faculty Photo */}
                <div className="relative flex-shrink-0">
                  <img
                    src={faculty.attributes.Photo?.data?.attributes?.url}
                    alt={faculty.attributes.Name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover shadow-lg border-2 border-white/20"
                  />
                  <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl blur-lg opacity-50"></div>
                </div>

                {/* Faculty Details */}
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    {faculty.attributes.Name}
                  </h2>
                  <p className="text-indigo-300 font-medium text-base sm:text-lg">
                    {faculty.attributes.Designation}
                  </p>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {faculty.attributes.Department}
                    {faculty.attributes.sub_department && ` (${faculty.attributes.sub_department})`}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10"></div>

            {/* Rating Section */}
            <div className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Your Rating</h3>
                <p className="text-gray-400 text-sm sm:text-base">Rate this professor based on your experience</p>
              </div>
              
              <div className="flex justify-center">
                <StarRatingForm id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
