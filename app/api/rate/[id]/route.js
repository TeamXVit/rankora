import Faculty from "@/models/Faculty";
import dbConnect from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(request, { params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await dbConnect();

  try {
    const body = await request.json();
    const { teaching, attendance, theory, lab, project } = body;

    let faculty = await Faculty.findOne({ facultyId: id });

    if (!faculty) {
      faculty = await Faculty.create({
        facultyId: id,
        ratings: { teaching: 0, attendance: 0, theory: 0, lab: 0, project: 0 },
        ratedBy: [],
        ratingCounts: { teaching: 0, attendance: 0, theory: 0, lab: 0, project: 0 },
      });
    }

    const userEmail = session.user.email;
    if (faculty.ratedBy.includes(userEmail)) {
      return new Response(
        JSON.stringify({ error: "You have already rated this faculty" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Update averages only if rating > 0
    const updateAverage = (currentAvg, currentCount, newValue) => {
      if (newValue > 0) {
        return {
          avg: (currentAvg * currentCount + newValue) / (currentCount + 1),
          count: currentCount + 1,
        };
      }
      return { avg: currentAvg, count: currentCount };
    };

    let result;

    result = updateAverage(faculty.ratings.teaching, faculty.ratingCounts.teaching, teaching);
    faculty.ratings.teaching = result.avg;
    faculty.ratingCounts.teaching = result.count;

    result = updateAverage(faculty.ratings.attendance, faculty.ratingCounts.attendance, attendance);
    faculty.ratings.attendance = result.avg;
    faculty.ratingCounts.attendance = result.count;

    result = updateAverage(faculty.ratings.theory, faculty.ratingCounts.theory, theory);
    faculty.ratings.theory = result.avg;
    faculty.ratingCounts.theory = result.count;

    result = updateAverage(faculty.ratings.lab, faculty.ratingCounts.lab, lab);
    faculty.ratings.lab = result.avg;
    faculty.ratingCounts.lab = result.count;

    result = updateAverage(faculty.ratings.project, faculty.ratingCounts.project, project);
    faculty.ratings.project = result.avg;
    faculty.ratingCounts.project = result.count;

    faculty.ratedBy.push(userEmail);
    await faculty.save();

    return Response.json({ message: "Rating submitted successfully", faculty });
  } catch (error) {
    console.error("POST Faculty Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
