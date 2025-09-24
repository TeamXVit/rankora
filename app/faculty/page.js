import FacultyList from "./FacultyList";

async function getFacultyData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data.json`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to load data.json");
  }
  return res.json();
}

export default async function FacultyPage() {
  const data = await getFacultyData();
  const faculties = data.data;

  return (
    <div className="min-h-screen relative pt-6">
      <div className="relative z-10 max-w-7xl mx-auto py-10 px-6">
        {/* Clean Header */}
        <div className="text-center mb-16 mt-4">
          <div className="relative">
            {/* Main heading - solid white */}
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
              Faculty Directory
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="mt-6">
            <p className="text-xl text-gray-300 font-medium tracking-wide">
              Discover & Rate Your Professors
            </p>
          </div>
        </div>

        {/* Faculty list - no card */}
        <FacultyList faculties={faculties} />
      </div>
    </div>
  );
}
