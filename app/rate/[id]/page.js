import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import StarRatingForm from "./StarRatingForm";

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
    cache: "no-store", // prevents stale data if ratings update often
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data; // { facultyId, ratings, ratedBy }
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
  const rating  = await fetchFacultyRating(id);
  console.log(rating)
  await dbConnect();

  if (!faculty) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Faculty not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full bg-white shadow-lg rounded-2xl p-8">
        {/* Left: Faculty details */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Photo */}
          <img
            src={faculty.attributes.Photo.data.attributes.url}
            alt={faculty.attributes.Name}
            className="w-32 h-32 rounded-xl object-cover shadow mb-4 mx-auto"
          />
          {/* Name + Designation */}
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            {faculty.attributes.Name}
          </h2>
          <p className="text-sm text-gray-600 text-center mb-2">
            {faculty.attributes.Designation}
          </p>
          <p className="text-sm text-gray-500 text-center">
            {faculty.attributes.Department} ({faculty.attributes.sub_department})
          </p>

          <div className="mt-4 text-left w-full">
            <p className="font-medium text-gray-700 mb-2">
              Current Ratings (avg out of 5):
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Teaching: {rating?rating.ratings.teaching:0}</li>
              <li>Attendance: {rating?rating.ratings.attendance:0}</li>
              <li>Theory: {rating?rating.ratings.theory:0}</li>
              <li>Lab: {rating?rating.ratings.lab:0}</li>
              <li>Project: {rating?rating.ratings.project:0}</li>
            </ul>
          </div>
        </div>

        {/* Right: Rating form */}
        <div className="flex items-center justify-center">
          <StarRatingForm id={id} />
        </div>
      </div>
    </div>
  );
}
