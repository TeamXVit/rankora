"use client";
import { useState } from "react";

export default function FacultyList({ faculties }) {
  const [query, setQuery] = useState("");

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
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
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

              {/* Contact */}
              <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">Office:</span>{" "}
                  {faculty.Office_Address}
                </p>
                <p>
                  <span className="font-semibold">Contact:</span>{" "}
                  {faculty.Contact_No}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href={`mailto:${faculty.EMAIL}`}
                    className="text-blue-600 hover:underline"
                  >
                    {faculty.EMAIL}
                  </a>
                </p>
              </div>

              {/* Education */}
              <div className="mt-4">
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  Education
                </h3>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  {faculty.Education_UG && <li>UG: {faculty.Education_UG}</li>}
                  {faculty.Education_PG && <li>PG: {faculty.Education_PG}</li>}
                  {faculty.Education_PHD && (
                    <li>PhD: {faculty.Education_PHD}</li>
                  )}
                </ul>
              </div>

              {/* Research */}
              <div className="mt-4">
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  Research
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {faculty.Research_area_of_specialization}
                </p>
                <div className="flex flex-wrap gap-2">
                  {faculty.Research_google_schloar && (
                    <a
                      href={faculty.Research_google_schloar}
                      target="_blank"
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg hover:bg-blue-200 transition"
                    >
                      Google Scholar
                    </a>
                  )}
                  {faculty.Research_Scopus_Id && (
                    <a
                      href={faculty.Research_Scopus_Id}
                      target="_blank"
                      className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-lg hover:bg-green-200 transition"
                    >
                      Scopus
                    </a>
                  )}
                  {faculty.Research_vidwan && (
                    <a
                      href={faculty.Research_vidwan}
                      target="_blank"
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg hover:bg-purple-200 transition"
                    >
                      Vidwan
                    </a>
                  )}
                  {faculty.LinkedIn && (
                    <a
                      href={faculty.LinkedIn}
                      target="_blank"
                      className="px-3 py-1 bg-sky-100 text-sky-700 text-xs rounded-lg hover:bg-sky-200 transition"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>

              {/* Memberships */}
              {faculty.Professonal_Membership && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold text-gray-800 mb-2">
                    Memberships
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {faculty.Professonal_Membership.split(",").map((m, i) => (
                      <li key={i}>{m.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}
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
