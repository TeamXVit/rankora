// import { authOptions } from "@/lib/auth";
import Faculty from "@/models/Faculty";
import dbConnect from "@/lib/mongodb";

export async function GET(req, { params }) {
  const { id } = await params;
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return new Response(JSON.stringify({ error: "Unauthorized" }), {
  //     status: 401,
  //     headers: { "Content-Type": "application/json" },
  //   });
  // }

  await dbConnect();

  try {
    let faculty = await Faculty.findOne({ facultyId: id });

    // if (!faculty) {
    //   // auto-create default faculty if missing
    //   faculty = await Faculty.create({
    //     facultyId: id,
    //     ratings: {
    //       attendance: 0,
    //       theory: 0,
    //       lab: 0,
    //       project: 0,
    //     },
    //     ratedBy: [],
    //   });
    // }

    return new Response(JSON.stringify(faculty), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching faculty:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
