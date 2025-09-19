import { notFound } from "next/navigation";
import { 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  GraduationCap, 
  Microscope, 
  Users, 
  Award, 
  Lightbulb, 
  Rocket, 
  ExternalLink,
  ChevronDown,
  BarChart3
} from "lucide-react";

// Accordion Component
function Accordion({ children, title, icon, defaultOpen = false, count = null }) {
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
}

async function getFaculty(id) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data.json`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to load data.json");

  const { data } = await res.json();
  return data.find((item) => String(item.id) === id);
}

export default async function FacultyDetailPage({ params }) {
  const faculty = await getFaculty(params.id);

  if (!faculty) {
    notFound();
  }

  const f = faculty.attributes;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {f.Photo?.data?.attributes?.url && (
              <div className="flex-shrink-0">
                <img
                  src={f.Photo.data.attributes.url}
                  alt={f.Name}
                  className="w-48 h-48 rounded-lg object-cover shadow-lg"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{f.Name}</h1>
              <h2 className="text-xl text-gray-700 mb-2">{f.Designation}</h2>
              <p className="text-lg text-gray-600 mb-6">{f.Department}</p>
              
              {/* Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {f.EMAIL && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a href={`mailto:${f.EMAIL}`} className="text-blue-600 hover:text-blue-800">
                      {f.EMAIL}
                    </a>
                  </div>
                )}
                {f.Contact_No && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{f.Contact_No}</span>
                  </div>
                )}
                {f.Office_Address && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{f.Office_Address}</span>
                  </div>
                )}
                {f.Employee_Id && (
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">ID: {f.Employee_Id}</span>
                  </div>
                )}
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