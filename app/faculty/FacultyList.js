"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const VIT_AP_SCHOOLS = [
  "School of Computer Science and Engineering (SCOPE)",
  "School of Electronics Engineering (SENSE)", 
  "School of Mechanical Engineering (SMEC)",
  "School of Advanced Sciences (SAS)",
  "School of Social Sciences and Humanities (VISH)",
  "School of Business (VSB)",
  "School of Law (VSL)"
];

export default function FacultyList({ faculties }) {
  const [query, setQuery] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("all");
  const router = useRouter();

  const filtered = useMemo(() => {
    // SAFETY CHECK - This prevents the error
    if (!faculties || !Array.isArray(faculties)) return [];
    
    return faculties.filter((item) => {
      const f = item.attributes;
      const q = query.toLowerCase();
      
      const matchesSearch = (
        f.Name.toLowerCase().includes(q) ||
        f.Designation.toLowerCase().includes(q) ||
        f.Department.toLowerCase().includes(q)
      );

      const matchesSchool = schoolFilter === "all" || f.Department.includes(schoolFilter) || f.Department === schoolFilter;

      return matchesSearch && matchesSchool;
    });
  }, [faculties, query, schoolFilter]);

  return (
    <>
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search faculty by name, designation, or department..."
            className="hidden md:block w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search"
            className="block md:hidden w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* School Filter */}
        <div className="relative max-w-md mx-auto">
          <select
            value={schoolFilter}
            onChange={(e) => setSchoolFilter(e.target.value)}
            className="block w-full px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value="all" className="bg-gray-900">All Schools</option>
            {VIT_AP_SCHOOLS.map(school => (
              <option key={school} value={school} className="bg-gray-900">{school}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center">
          <span className="text-gray-400 text-sm">
            Showing {filtered.length} of {faculties?.length || 0} faculty members
          </span>
        </div>
      </div>

      {/* Faculty Grid - 3 COLUMNS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const faculty = item.attributes;

          return (
            <div
              key={item.id}
              onClick={() => router.push(`/faculty/${item.id}`)}
              className="group cursor-pointer bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 hover:bg-gray-800/70 transition-all duration-300 p-6"
            >
              {/* Faculty Photo */}
              {faculty.Photo?.data?.attributes?.url && (
                <div className="mb-4">
                  <img
                    src={faculty.Photo.data.attributes.url}
                    alt={faculty.Name}
                    className="w-24 h-24 rounded-lg object-cover mx-auto border-2 border-gray-700 group-hover:border-gray-600 transition-colors duration-300"
                  />
                </div>
              )}

              {/* Faculty Info */}
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors duration-300">
                  {faculty.Name}
                </h3>
                <p className="text-sm text-gray-400 font-medium">
                  {faculty.Designation}
                </p>
                <p className="text-xs text-gray-500">
                  {faculty.Department}
                  {faculty.sub_department && ` (${faculty.sub_department})`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 814 0zM7 10a2 2 0 11-4 0 2 2 0 814 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Faculty Found</h3>
          <p className="text-gray-400">
            {query ? `No results found for "${query}"` : "No faculty members match the selected criteria"}
          </p>
        </div>
      )}
    </>
  );
}
