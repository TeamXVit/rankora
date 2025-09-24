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

const fetchFacultyRating = async (id) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/faculty/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data;
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
  const rating = await fetchFacultyRating(id);
  console.log(rating);
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
    <div className="min-h-screen bg-transparent p-4 sm:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href={`/faculty/${id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl shadow-lg hover:bg-white/20 transition-all duration-300 text-white font-medium backdrop-blur-xl"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Faculty Details Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-2">
                  Rate Faculty
                </h1>
                <p className="text-gray-400">Share your experience with this professor</p>
              </div>

              {/* Faculty Photo */}
              <div className="relative">
                <img
                  src={faculty.attributes.Photo?.data?.attributes?.url}
                  alt={faculty.attributes.Name}
                  className="w-32 h-32 rounded-2xl object-cover shadow-2xl border-2 border-white/20"
                />
                <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50"></div>
              </div>

              {/* Faculty Details */}
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">
                  {faculty.attributes.Name}
                </h2>
                <p className="text-indigo-300 font-medium">
                  {faculty.attributes.Designation}
                </p>
                <p className="text-gray-400 text-sm">
                  {faculty.attributes.Department}
                  {faculty.attributes.sub_department && ` (${faculty.attributes.sub_department})`}
                </p>
              </div>

              {/* Current Ratings */}
              <div className="w-full">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 712-2h2a2 2 0 712 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 712-2h2a2 2 0 712 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Current Ratings (Average out of 5) (total rating : {rating ? rating.ratedBy.length : 0})
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { key: 'teaching', label: 'Teaching' },
                      { key: 'attendance', label: 'Attendance' },
                      { key: 'theory', label: 'Theory' },
                      { key: 'lab', label: 'Lab' },
                      { key: 'project', label: 'Project' }
                    ].map((item) => {
                      const ratingValue = rating?.ratings[item.key] || 0;

                      // Color-coded number based on rating value
                      const getNumberColor = (value) => {
                        if (value >= 4.5) return 'text-green-400';
                        if (value >= 3.5) return 'text-yellow-400';
                        if (value >= 2.5) return 'text-orange-400';
                        if (value >= 1.5) return 'text-red-400';
                        return 'text-gray-400';
                      };

                      return (
                        <div key={item.key} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                          <span className="text-gray-300 font-medium">{item.label}:</span>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => {
                                const fullStars = Math.floor(ratingValue);
                                const hasHalfStar = ratingValue % 1 >= 0.5;

                                if (star <= fullStars) {
                                  // Full star
                                  return (
                                    <svg
                                      key={star}
                                      className="w-4 h-4 text-indigo-400 fill-indigo-400"
                                      fill="currentColor"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                  );
                                } else if (star === fullStars + 1 && hasHalfStar) {
                                  // Half star
                                  return (
                                    <div key={star} className="relative w-4 h-4">
                                      <svg
                                        className="w-4 h-4 text-gray-600 absolute inset-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                      </svg>
                                      <div className="overflow-hidden w-1/2 absolute inset-0">
                                        <svg
                                          className="w-4 h-4 text-indigo-400 fill-indigo-400"
                                          fill="currentColor"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                      </div>
                                    </div>
                                  );
                                } else {
                                  // Empty star
                                  return (
                                    <svg
                                      key={star}
                                      className="w-4 h-4 text-gray-600"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                  );
                                }
                              })}
                            </div>

                            <span className={`${getNumberColor(ratingValue)} font-bold text-sm`}>
                              {ratingValue}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Rating Form Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 flex items-center justify-center">
            <div className="w-full">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white mb-2">Your Rating</h2>
                <p className="text-gray-400">Rate this professor based on your experience</p>
              </div>
              <StarRatingForm id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
