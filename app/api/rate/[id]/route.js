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
    const { attendance, theory, lab, project } = body;

    let faculty = await Faculty.findOne({ facultyId: id });

    if (!faculty) {
      faculty = await Faculty.create({
        facultyId: id,
        ratings: { attendance: 0, theory: 0, lab: 0, project: 0 },
        ratedBy: [],
      });
    }

    const userEmail = session.user.email;
    if (faculty.ratedBy.includes(userEmail)) {
      return new Response(
        JSON.stringify({ error: "You have already rated this faculty" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    faculty.ratings.attendance =
      (faculty.ratings.attendance * faculty.ratedBy.length + attendance) /
      (faculty.ratedBy.length + 1);

    faculty.ratings.theory =
      (faculty.ratings.theory * faculty.ratedBy.length + theory) /
      (faculty.ratedBy.length + 1);

    faculty.ratings.lab =
      (faculty.ratings.lab * faculty.ratedBy.length + lab) /
      (faculty.ratedBy.length + 1);

    faculty.ratings.project =
      (faculty.ratings.project * faculty.ratedBy.length + project) /
      (faculty.ratedBy.length + 1);

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
