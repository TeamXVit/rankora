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
  ArrowLeft,
} from "lucide-react";

// Skeleton Components
const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-800 animate-pulse rounded ${className}`}></div>
);

const SkeletonText = ({ lines = 1, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`bg-gray-800 animate-pulse rounded h-4 ${
          i === lines - 1 ? "w-3/4" : "w-full"
        }`}
      ></div>
    ))}
  </div>
);

const SkeletonAccordion = () => (
  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-3">
        <SkeletonBox className="w-10 h-10 rounded-lg" />
        <SkeletonBox className="w-32 h-6 rounded" />
      </div>
      <SkeletonBox className="w-5 h-5 rounded" />
    </div>
    <div className="px-6 pb-6 pt-0 border-t border-white/10">
      <SkeletonText lines={3} />
    </div>
  </div>
);

const SkeletonRatingRow = () => (
  <div className="flex items-center justify-between pb-4 border-b border-white/10">
    <SkeletonBox className="w-32 h-5 rounded" />
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBox key={i} className="w-5 h-5 rounded" />
        ))}
      </div>
      <SkeletonBox className="w-12 h-4 rounded" />
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-transparent text-white">
    {/* Header Section Skeleton */}
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <SkeletonBox className="w-20 h-12 rounded-xl" />
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Left Column Skeleton */}
          <div className="w-full lg:w-1/3">
            {/* Image Skeleton */}
            <div className="flex-shrink-0 mb-6">
              <SkeletonBox className="w-48 h-48 rounded-2xl mx-auto lg:mx-0" />
            </div>

            {/* Faculty Details Skeleton */}
            <div className="text-center lg:text-left">
              <SkeletonBox className="w-64 h-8 rounded mb-2 mx-auto lg:mx-0" />
              <SkeletonBox className="w-48 h-6 rounded mb-1 mx-auto lg:mx-0" />
              <SkeletonBox className="w-56 h-5 rounded mb-6 mx-auto lg:mx-0" />

              {/* Contact Info Skeleton */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                  <SkeletonBox className="w-5 h-5 rounded" />
                  <SkeletonBox className="w-48 h-4 rounded" />
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
                  <SkeletonBox className="w-5 h-5 rounded" />
                  <SkeletonBox className="w-40 h-4 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Ratings Skeleton */}
          <div className="flex-1 w-full">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
              <SkeletonBox className="w-48 h-8 rounded mb-6" />
              <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRatingRow key={i} />
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <SkeletonBox className="w-40 h-12 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Main Content Skeleton */}
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-2 space-y-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonAccordion key={i} />
          ))}
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Quick Stats Skeleton */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <SkeletonBox className="w-10 h-10 rounded-lg" />
              <SkeletonBox className="w-24 h-6 rounded" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 bg-white/5 rounded-xl"
                >
                  <SkeletonBox className="w-20 h-4 rounded" />
                  <SkeletonBox className="w-8 h-4 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Academic Links Skeleton */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6">
            <SkeletonBox className="w-32 h-6 rounded mb-6" />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
                >
                  <SkeletonBox className="w-28 h-4 rounded" />
                  <SkeletonBox className="w-4 h-4 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Dark Theme Accordion Component
const Accordion = ({
  children,
  title,
  icon,
  defaultOpen = false,
  count = null,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      <details className="group" open={defaultOpen}>
        <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            {count !== null && (
              <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium border border-indigo-500/30">
                {count}
              </span>
            )}
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <div className="px-6 pb-6 pt-0 border-t border-white/10">
          {children}
        </div>
      </details>
    </div>
  );
};

// Move fetch function outside component to prevent recreation
const fetchFacultyData = async (id) => {
  const res = await fetch(`/data.json`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to load data.json");

  const { data } = await res.json();
  return data.find((item) => String(item.id) === id);
};

const fetchFacultyRating = async (id) => {
  const res = await fetch(`/api/faculty/${id}`, {
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

export default function FacultyDetailPage({ params }) {
  const router = useRouter();
  const [faculty, setFaculty] = useState(null);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = use(params);

  // Memoized categories to prevent recreation on every render
  const categories = useMemo(
    () => [
      { key: "teaching", label: "Teaching" },
      { key: "attendance", label: "Attendance" },
      { key: "theory", label: "Theory Evaluation" },
      { key: "lab", label: "Lab Evaluation" },
      { key: "project", label: "Project Evaluation (ECS, Capstone, Project)" },
    ],
    []
  );

  // Memoized ratings to prevent recreation
  const ratings = useMemo(
    () => ({
      teaching: 0,
      attendance: 0,
      theory: 0,
      lab: 0,
      project: 0,
    }),
    []
  );

  // Memoized render stars function with half-star support
  const renderStars = useCallback((value) => {
    const stars = [];
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        // Full star
        stars.push(
          <Star key={i} className="w-5 h-5 text-indigo-400 fill-indigo-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        // Half star
        stars.push(
          <div key={i} className="relative w-5 h-5">
            <Star className="w-5 h-5 text-gray-600 absolute inset-0" />
            <div className="overflow-hidden w-1/2 absolute inset-0">
              <Star className="w-5 h-5 text-indigo-400 fill-indigo-400" />
            </div>
          </div>
        );
      } else {
        // Empty star
        stars.push(<Star key={i} className="w-5 h-5 text-gray-600" />);
      }
    }
    return stars;
  }, []);

  // Back button handler with useCallback to prevent recreation
  const handleGoBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  // Effect for fetching faculty data
  useEffect(() => {
    let isMounted = true;

    const loadFaculty = async () => {
      try {
        setLoading(true);
        setError(null);
        const facultyData = await fetchFacultyData(id);
        const facultyRating = await fetchFacultyRating(id);

        if (!isMounted) return;

        if (!facultyData) {
          notFound();
          return;
        }

        setFaculty(facultyData);
        setRating(facultyRating);
      } catch (err) {
        if (!isMounted) return;

        console.error("Error loading faculty data:", err);
        setError(err.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFaculty();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Loading state with skeleton
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">
            Error loading faculty data: {error}
          </p>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors duration-300 font-medium"
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
    <div className="min-h-screen bg-transparent text-white">
      {/* Header Section */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => {
                window.location.href = "/faculty";
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl shadow-lg hover:bg-white/20 transition-all duration-300 text-white font-medium backdrop-blur-xl"
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
                  <div className="relative">
                    <img
                      src={f.Photo.data.attributes.url}
                      alt={f.Name}
                      className="w-48 h-48 rounded-2xl object-cover shadow-2xl mx-auto lg:mx-0 border-2 border-white/20"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 w-48 h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-50 mx-auto lg:mx-0"></div>
                  </div>
                </div>
              )}

              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-2 text-center lg:text-left">
                  {f.Name}
                </h1>
                <h2 className="text-lg text-indigo-300 mb-1 text-center lg:text-left font-medium">
                  {f.Designation}
                </h2>
                <p className="text-md text-gray-400 mb-6 text-center lg:text-left">
                  {f.Department}
                </p>

                {/* Contact Info */}
                <div className="grid grid-cols-1 gap-4">
                  {f.EMAIL && (
                    <div className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-xl backdrop-blur-xl border border-white/10">
                      <Mail className="w-5 h-5 text-indigo-400" />
                      <a
                        href={`mailto:${f.EMAIL}`}
                        className="text-indigo-300 hover:text-indigo-100 transition-colors"
                      >
                        {f.EMAIL}
                      </a>
                    </div>
                  )}
                  {f.Office_Address && (
                    <div className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-xl backdrop-blur-xl border border-white/10">
                      <MapPin className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">{f.Office_Address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Ratings */}
            <div className="flex-1 w-full">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                    Faculty Ratings
                  </h3>
                  {/* Total People Rated */}
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 bg-white/10 rounded-lg border border-white/20">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-300" />
                    <span className="text-xs sm:text-sm text-gray-300 font-medium">
                      {rating?.ratedBy.length || 0} <span className="hidden md:inline">rated</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {categories.map((cat) => (
                    <div
                      key={cat.key}
                      className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10"
                    >
                      <span className="text-gray-300 font-medium text-sm sm:text-base">
                        {/* Short labels for mobile */}
                        <span className="sm:hidden">
                          {cat.key === "teaching" && "Teaching"}
                          {cat.key === "attendance" && "Attendance"}
                          {cat.key === "theory" && "Theory"}
                          {cat.key === "lab" && "Lab"}
                          {cat.key === "project" && "Project"}
                        </span>
                        {/* Full labels for tablet+ */}
                        <span className="hidden sm:inline">{cat.label}</span>
                      </span>

                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex">
                          {renderStars(
                            rating ? rating.ratings[cat.key] : ratings[cat.key],
                            { size: 12 } // ✅ pass smaller size on mobile (adjust renderStars fn)
                          )}
                        </div>
                        <span className="text-indigo-300 text-xs sm:text-sm font-semibold min-w-[32px] sm:min-w-[40px] text-right">
                          {(rating
                            ? rating.ratings[cat.key]
                            : ratings[cat.key]
                          ).toFixed(1)}
                          /5.0
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 sm:mt-8 flex justify-center">
                  <a
                    href={`/rate/${id}`}
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-500 overflow-hidden text-sm sm:text-base"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center gap-1.5 sm:gap-2">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                      Give Rating
                    </div>
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
              icon={<GraduationCap className="w-6 h-6 text-indigo-400" />}
              defaultOpen={true}
            >
              <div className="space-y-4">
                {f.Education_PHD && (
                  <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-500/10 p-4 rounded-r-xl">
                    <div className="font-semibold text-indigo-300">
                      Doctor of Philosophy
                    </div>
                    <div className="text-gray-400">{f.Education_PHD}</div>
                  </div>
                )}
                {f.Education_PG && (
                  <div className="border-l-4 border-purple-500 pl-4 bg-purple-500/10 p-4 rounded-r-xl">
                    <div className="font-semibold text-purple-300">
                      Post Graduate
                    </div>
                    <div className="text-gray-400">{f.Education_PG}</div>
                  </div>
                )}
                {f.Education_UG && (
                  <div className="border-l-4 border-pink-500 pl-4 bg-pink-500/10 p-4 rounded-r-xl">
                    <div className="font-semibold text-pink-300">
                      Under Graduate
                    </div>
                    <div className="text-gray-400">{f.Education_UG}</div>
                  </div>
                )}
                {f.Education_other && (
                  <div className="border-l-4 border-gray-500 pl-4 bg-gray-500/10 p-4 rounded-r-xl">
                    <div className="font-semibold text-gray-300">
                      Other Qualifications
                    </div>
                    <div className="text-gray-400">{f.Education_other}</div>
                  </div>
                )}
              </div>
            </Accordion>

            {/* Research Areas Accordion */}
            {f.Research_area_of_specialization && (
              <Accordion
                title="Research Specialization"
                icon={<Microscope className="w-6 h-6 text-purple-400" />}
              >
                <p className="text-gray-300 leading-relaxed">
                  {f.Research_area_of_specialization}
                </p>
              </Accordion>
            )}

            {/* Professional Membership Accordion */}
            {f.Professonal_Membership && (
              <Accordion
                title="Professional Memberships"
                icon={<Users className="w-6 h-6 text-pink-400" />}
              >
                <p className="text-gray-300">{f.Professonal_Membership}</p>
              </Accordion>
            )}

            {/* Awards Accordion */}
            {f.Awards_and_Recognitions?.length > 0 && (
              <Accordion
                title="Awards & Recognition"
                icon={<Award className="w-6 h-6 text-yellow-400" />}
                count={f.Awards_and_Recognitions.length}
              >
                <div className="space-y-4">
                  {f.Awards_and_Recognitions.map((award, index) => (
                    <div
                      key={award.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 border border-yellow-500/30">
                          {index + 1}
                        </div>
                        <p className="text-gray-300">
                          {award.award_or_recognition_name}
                        </p>
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
                icon={<Lightbulb className="w-6 h-6 text-orange-400" />}
                count={f.Patents.length}
              >
                <div className="space-y-3">
                  {f.Patents.map((patent) => (
                    <div
                      key={patent.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <p className="text-gray-300">{patent.patent}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
            )}

            {/* Projects Accordion */}
            {f.Projects?.length > 0 && (
              <Accordion
                title="Research Projects"
                icon={<Rocket className="w-6 h-6 text-blue-400" />}
                count={f.Projects.length}
              >
                <div className="space-y-3">
                  {f.Projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <p className="text-gray-300">{project.project}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Overview</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Patents</span>
                  <span className="font-bold text-indigo-300">
                    {f.Patents?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Projects</span>
                  <span className="font-bold text-purple-300">
                    {f.Projects?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Awards</span>
                  <span className="font-bold text-pink-300">
                    {f.Awards_and_Recognitions?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Academic Links */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">
                Academic Profiles
              </h3>
              <div className="space-y-3">
                {f.Research_google_schloar && (
                  <a
                    href={f.Research_google_schloar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="text-gray-300 group-hover:text-white">
                      Google Scholar
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-400" />
                  </a>
                )}
                {f.Research_Research_Gate && (
                  <a
                    href={f.Research_Research_Gate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="text-gray-300 group-hover:text-white">
                      ResearchGate
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                  </a>
                )}
                {f.Research_Scopus_Id && (
                  <a
                    href={f.Research_Scopus_Id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="text-gray-300 group-hover:text-white">
                      Scopus
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pink-400" />
                  </a>
                )}
                {f.Research_orchid && (
                  <a
                    href={f.Research_orchid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="text-gray-300 group-hover:text-white">
                      ORCID
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-400" />
                  </a>
                )}
                {f.Research_vidwan && (
                  <a
                    href={f.Research_vidwan}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="text-gray-300 group-hover:text-white">
                      Vidwan
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                  </a>
                )}
                {f.LinkedIn && (
                  <a
                    href={f.LinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="text-gray-300 group-hover:text-white">
                      LinkedIn
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                  </a>
                )}
                {f.Website && (
                  <a
                    href={
                      f.Website.startsWith("http")
                        ? f.Website
                        : `https://${f.Website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="text-gray-300 group-hover:text-white">
                      Personal Website
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
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
