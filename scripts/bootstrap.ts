import { config } from "dotenv";

config({ path: ".env.local" });

const { eq } = await import("drizzle-orm");
const { db, pool } = await import("../src/lib/db");
const { achievements, programs } = await import("../src/db/schema");

async function main() {
  const existing = await db.select().from(programs).where(eq(programs.slug, "bumbum-verao")).limit(1);
  if (!existing.length) {
    await db.insert(programs).values({
      slug: "bumbum-verao",
      name: "BUM BUM VERÃO",
      description: "90 dias de treino organizado para quem quer levar o desenvolvimento dos glúteos a sério.",
      durationDays: 90,
      priceCents: 3790,
      lifetimeUpgradePriceCents: 1990,
      active: true,
    });
    console.log("Programa BUM BUM VERÃO criado.");
  } else {
    console.log("Programa BUM BUM VERÃO já existe.");
  }

  const baseAchievements = [
    { code: "FIRST_WEEK", name: "Primeira semana concluída", description: "Concluiu a primeira semana do programa.", triggerType: "program_percent", triggerValue: 8 },
    { code: "P25", name: "25% do programa", description: "Chegou a 25% do BUM BUM VERÃO.", triggerType: "program_percent", triggerValue: 25 },
    { code: "P50", name: "50% do programa", description: "Chegou à metade do programa.", triggerType: "program_percent", triggerValue: 50 },
    { code: "P100", name: "90 dias concluídos", description: "Concluiu o BUM BUM VERÃO.", triggerType: "program_percent", triggerValue: 100 },
  ];

  for (const item of baseAchievements) {
    const exists = await db.select().from(achievements).where(eq(achievements.code, item.code)).limit(1);
    if (!exists.length) await db.insert(achievements).values(item);
  }
  console.log("Conquistas-base verificadas.");
}

main().finally(async () => pool.end());
