"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FacultyList({ faculties }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = faculties.filter((item) => {
    const f = item.attributes;
    const q = query.toLowerCase();
    return (
      f.Name.toLowerCase().includes(q) ||
      f.Designation.toLowerCase().includes(q) ||
      f.Department.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by name, designation, or department..."
          className="w-full max-w-lg px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Faculty Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const faculty = item.attributes;

          return (
            <div
              key={item.id}
              onClick={() => router.push(`/faculty/${item.id}`)}
              className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-200 p-6 flex flex-col"
            >
              {/* Photo */}
              {faculty.Photo?.data?.attributes?.url && (
                <img
                  src={faculty.Photo.data.attributes.url}
                  alt={faculty.Name}
                  className="w-32 h-32 rounded-xl object-cover shadow mb-4 mx-auto"
                />
              )}

              {/* Name + Designation */}
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                {faculty.Name}
              </h2>
              <p className="text-sm text-gray-600 text-center mb-2">
                {faculty.Designation}
              </p>
              <p className="text-sm text-gray-500 text-center">
                {faculty.Department} ({faculty.sub_department})
              </p>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No faculty found for "{query}"
        </p>
      )}
    </>
  );
}
