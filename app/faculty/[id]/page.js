"use client";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo, use } from "react";
import { 
  Mail, 
  MapPin, 
  Star,
  GraduationCap, 
  Microscope, 
  Users, 
  Award, 
  Lightbulb, 
  Rocket, 
  ExternalLink,
  ChevronDown,
  BarChart3,
  ArrowLeft
} from "lucide-react";

// Memoized Accordion Component to prevent unnecessary re-renders
const Accordion = ({ children, title, icon, defaultOpen = false, count = null }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <details className="group" open={defaultOpen}>
        <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            {icon}
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            {count !== null && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                {count}
              </span>
            )}
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" />
        </summary>
        <div className="px-6 pb-6 pt-0">
          {children}
        </div>
      </details>
    </div>
  );
};

// Move fetch function outside component to prevent recreation
const fetchFacultyData = async (id) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data.json`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to load data.json");

  const { data } = await res.json();
  return data.find((item) => String(item.id) === id);
};

export default function FacultyDetailPage({ params }) {
  const router = useRouter();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = use(params);

  // Memoized categories to prevent recreation on every render
  const categories = useMemo(() => [
    { key: "attendance", label: "Attendance" },
    { key: "theory", label: "Theory Evaluation" },
    { key: "lab", label: "Lab Evaluation" },
    { key: "project", label: "Project Evaluation (ECS, Capstone, Project)" },
  ], []);

  // Memoized ratings to prevent recreation
  const ratings = useMemo(() => ({
    attendance: 0,
    theory: 0,
    lab: 0,
    project: 0,
  }), []);

  // Memoized render stars function
  const renderStars = useCallback((value) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            i <= value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  }, []);

  // Back button handler with useCallback to prevent recreation
  const handleGoBack = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  }, [router]);

  // Effect for fetching faculty data
  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component

    const loadFaculty = async () => {
      try {
        setLoading(true);
        setError(null);
        const facultyData = await fetchFacultyData(id);
        
        if (!isMounted) return; // Prevent state update if component unmounted
        
        if (!facultyData) {
          notFound();
          return;
        }
        
        setFaculty(facultyData);
      } catch (err) {
        if (!isMounted) return; // Prevent state update if component unmounted
        
        console.error('Error loading faculty data:', err);
        setError(err.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFaculty();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading faculty profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading faculty data: {error}</p>
          <button 
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Not found state
  if (!faculty) {
    notFound();
  }

  const f = faculty.attributes;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-gray-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10">
            {/* Left Column: Image + Faculty Details */}
            <div className="w-full lg:w-1/3">
              {f.Photo?.data?.attributes?.url && (
                <div className="flex-shrink-0 mb-6">
                  <img
                    src={f.Photo.data.attributes.url}
                    alt={f.Name}
                    className="w-48 h-48 rounded-xl object-cover shadow-lg mx-auto lg:mx-0"
                    loading="lazy" // Add lazy loading for performance
                  />
                </div>
              )}

              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1 text-center lg:text-left">
                  {f.Name}
                </h1>
                <h2 className="text-lg text-gray-700 mb-1 text-center lg:text-left">
                  {f.Designation}
                </h2>
                <p className="text-md text-gray-600 mb-6 text-center lg:text-left">
                  {f.Department}
                </p>

                {/* Contact Info */}
                <div className="grid grid-cols-1 gap-3">
                  {f.EMAIL && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a
                        href={`mailto:${f.EMAIL}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {f.EMAIL}
                      </a>
                    </div>
                  )}
                  {f.Office_Address && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{f.Office_Address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Ratings */}
            <div className="flex-1 w-full">
              <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Ratings
                </h3>
                <div className="space-y-5">
                  {categories.map((cat) => (
                    <div
                      key={cat.key}
                      className="flex items-center justify-between pb-3"
                    >
                      <span className="text-gray-800 font-medium">
                        {cat.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(ratings[cat.key])}</div>
                        <span className="text-gray-600 text-sm">
                          {ratings[cat.key]}/5
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <a
                    href="/give-rating"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition font-medium"
                  >
                    Give Rating
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Education Accordion */}
            <Accordion 
              title="Education" 
              icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
              defaultOpen={true}
            >
              <div className="space-y-4">
                {f.Education_PHD && (
                  <div className="border-l-4 border-blue-600 pl-4">
                    <div className="font-medium text-gray-900">Doctor of Philosophy</div>
                    <div className="text-gray-600">{f.Education_PHD}</div>
                  </div>
                )}
                {f.Education_PG && (
                  <div className="border-l-4 border-green-600 pl-4">
                    <div className="font-medium text-gray-900">Post Graduate</div>
                    <div className="text-gray-600">{f.Education_PG}</div>
                  </div>
                )}
                {f.Education_UG && (
                  <div className="border-l-4 border-purple-600 pl-4">
                    <div className="font-medium text-gray-900">Under Graduate</div>
                    <div className="text-gray-600">{f.Education_UG}</div>
                  </div>
                )}
                {f.Education_other && (
                  <div className="border-l-4 border-gray-600 pl-4">
                    <div className="font-medium text-gray-900">Other Qualifications</div>
                    <div className="text-gray-600">{f.Education_other}</div>
                  </div>
                )}
              </div>
            </Accordion>

            {/* Research Areas Accordion */}
            {f.Research_area_of_specialization && (
              <Accordion 
                title="Research Specialization" 
                icon={<Microscope className="w-6 h-6 text-green-600" />}
              >
                <p className="text-gray-700 leading-relaxed">{f.Research_area_of_specialization}</p>
              </Accordion>
            )}

            {/* Professional Membership Accordion */}
            {f.Professonal_Membership && (
              <Accordion 
                title="Professional Memberships" 
                icon={<Users className="w-6 h-6 text-indigo-600" />}
              >
                <p className="text-gray-700">{f.Professonal_Membership}</p>
              </Accordion>
            )}

            {/* Awards Accordion */}
            {f.Awards_and_Recognitions?.length > 0 && (
              <Accordion 
                title="Awards & Recognition" 
                icon={<Award className="w-6 h-6 text-yellow-600" />}
                count={f.Awards_and_Recognitions.length}
              >
                <div className="space-y-4">
                  {f.Awards_and_Recognitions.map((award, index) => (
                    <div key={award.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-100 text-yellow-700 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{award.award_or_recognition_name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Accordion>
            )}

            {/* Patents Accordion */}
            {f.Patents?.length > 0 && (
              <Accordion 
                title="Patents" 
                icon={<Lightbulb className="w-6 h-6 text-orange-600" />}
                count={f.Patents.length}
              >
                <div className="space-y-3">
                  {f.Patents.map((patent) => (
                    <div key={patent.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <p className="text-gray-700">{patent.patent}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
            )}

            {/* Projects Accordion */}
            {f.Projects?.length > 0 && (
              <Accordion 
                title="Research Projects" 
                icon={<Rocket className="w-6 h-6 text-blue-600" />}
                count={f.Projects.length}
              >
                <div className="space-y-3">
                  {f.Projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <p className="text-gray-700">{project.project}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Patents</span>
                  <span className="font-semibold text-gray-900">{f.Patents?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-semibold text-gray-900">{f.Projects?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Awards</span>
                  <span className="font-semibold text-gray-900">{f.Awards_and_Recognitions?.length || 0}</span>
                </div>
              </div>
            </div>

            {/* Academic Links */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Profiles</h3>
              <div className="space-y-3">
                {f.Research_google_schloar && (
                  <a
                    href={f.Research_google_schloar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">Google Scholar</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                )}
                {f.Research_Research_Gate && (
                  <a
                    href={f.Research_Research_Gate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">ResearchGate</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                )}
                {f.Research_Scopus_Id && (
                  <a
                    href={f.Research_Scopus_Id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">Scopus</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                )}
                {f.Research_orchid && (
                  <a
                    href={f.Research_orchid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">ORCID</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                )}
                {f.Research_vidwan && (
                  <a
                    href={f.Research_vidwan}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">Vidwan</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                )}
                {f.LinkedIn && (
                  <a
                    href={f.LinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">LinkedIn</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                )}
                {f.Website && (
                  <a
                    href={f.Website.startsWith('http') ? f.Website : `https://${f.Website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700">Personal Website</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
