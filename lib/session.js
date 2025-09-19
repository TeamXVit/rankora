import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // we'll export authOptions

export async function getUserSession() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("unauthorized");
  return session.user;
}
