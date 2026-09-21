import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireSession() {
  const session = await getSession();
  if (!session?.user) redirect("/login");

  const [profile] = await db
    .select({ userId: profiles.userId })
    .from(profiles)
    .where(eq(profiles.userId, session.user.id))
    .limit(1);

  if (!profile) {
    await db.insert(profiles).values({
      userId: session.user.id,
      fullName: session.user.name || "Aluna",
      role: "user",
    });
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireSession();
  const [profile] = await db
    .select({ role: profiles.role })
    .from(profiles)
    .where(eq(profiles.userId, session.user.id))
    .limit(1);

  if (profile?.role !== "admin") redirect("/inicio");
  return session;
}
