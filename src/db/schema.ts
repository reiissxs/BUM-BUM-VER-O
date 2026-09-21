import {
  boolean,
  date,
  integer,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("profile_role", ["user", "specialist", "admin"]);
export const accessTypeEnum = pgEnum("access_type", ["temporary", "lifetime"]);
export const accessStatusEnum = pgEnum("access_status", ["active", "expired", "blocked"]);
export const dayTypeEnum = pgEnum("program_day_type", ["workout", "rest"]);
export const sessionStatusEnum = pgEnum("workout_session_status", ["started", "completed", "cancelled"]);
export const supportStatusEnum = pgEnum("support_status", ["open", "answered", "closed"]);

export const profiles = pgTable(
  "profiles",
  {
    userId: text("user_id").primaryKey(),
    fullName: text("full_name").notNull(),
    role: roleEnum("role").default("user").notNull(),
    avatarUrl: text("avatar_url"),
    onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("profiles_user_id_unique").on(t.userId)],
);

export const programs = pgTable("programs", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  durationDays: integer("duration_days").default(90).notNull(),
  priceCents: integer("price_cents").notNull(),
  lifetimeUpgradePriceCents: integer("lifetime_upgrade_price_cents").notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const programAccess = pgTable(
  "program_access",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    programId: uuid("program_id").references(() => programs.id, { onDelete: "cascade" }).notNull(),
    accessType: accessTypeEnum("access_type").default("temporary").notNull(),
    status: accessStatusEnum("status").default("active").notNull(),
    startDate: date("start_date", { mode: "date" }).notNull(),
    endDate: date("end_date", { mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("program_access_user_program_unique").on(t.userId, t.programId)],
);

export const programWeeks = pgTable(
  "program_weeks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    programId: uuid("program_id").references(() => programs.id, { onDelete: "cascade" }).notNull(),
    weekNumber: integer("week_number").notNull(),
    title: text("title"),
    sortOrder: integer("sort_order").notNull(),
  },
  (t) => [uniqueIndex("program_week_unique").on(t.programId, t.weekNumber)],
);

export const workouts = pgTable("workouts", {
  id: uuid("id").defaultRandom().primaryKey(),
  programId: uuid("program_id").references(() => programs.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  subtitle: text("subtitle"),
  estimatedMinutes: integer("estimated_minutes"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const programDays = pgTable(
  "program_days",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    programId: uuid("program_id").references(() => programs.id, { onDelete: "cascade" }).notNull(),
    weekId: uuid("week_id").references(() => programWeeks.id, { onDelete: "set null" }),
    dayNumber: integer("day_number").notNull(),
    dayType: dayTypeEnum("day_type").notNull(),
    workoutId: uuid("workout_id").references(() => workouts.id, { onDelete: "set null" }),
    title: text("title"),
  },
  (t) => [uniqueIndex("program_day_unique").on(t.programId, t.dayNumber)],
);

export const exercises = pgTable("exercises", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  videoUrl: text("video_url"),
  videoPlaybackId: text("video_playback_id"),
  muscleGroup: text("muscle_group"),
  equipment: text("equipment"),
  technicalGuidance: text("technical_guidance"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const exerciseAlternatives = pgTable(
  "exercise_alternatives",
  {
    exerciseId: uuid("exercise_id").references(() => exercises.id, { onDelete: "cascade" }).notNull(),
    alternativeExerciseId: uuid("alternative_exercise_id").references(() => exercises.id, { onDelete: "cascade" }).notNull(),
    note: text("note"),
  },
  (t) => [primaryKey({ columns: [t.exerciseId, t.alternativeExerciseId] })],
);

export const workoutExercises = pgTable(
  "workout_exercises",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workoutId: uuid("workout_id").references(() => workouts.id, { onDelete: "cascade" }).notNull(),
    exerciseId: uuid("exercise_id").references(() => exercises.id, { onDelete: "restrict" }).notNull(),
    sortOrder: integer("sort_order").notNull(),
    sets: integer("sets").notNull(),
    repsMin: integer("reps_min"),
    repsMax: integer("reps_max"),
    repsText: text("reps_text"),
    restSeconds: integer("rest_seconds").notNull(),
    technicalGuidance: text("technical_guidance"),
  },
  (t) => [uniqueIndex("workout_exercise_order_unique").on(t.workoutId, t.sortOrder)],
);

export const workoutSessions = pgTable("workout_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  workoutId: uuid("workout_id").references(() => workouts.id, { onDelete: "restrict" }).notNull(),
  programDay: integer("program_day").notNull(),
  status: sessionStatusEnum("status").default("started").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  durationSeconds: integer("duration_seconds"),
});

export const setLogs = pgTable(
  "set_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workoutSessionId: uuid("workout_session_id").references(() => workoutSessions.id, { onDelete: "cascade" }).notNull(),
    workoutExerciseId: uuid("workout_exercise_id").references(() => workoutExercises.id, { onDelete: "restrict" }).notNull(),
    setNumber: integer("set_number").notNull(),
    loadKg: numeric("load_kg", { precision: 7, scale: 2 }),
    repetitions: integer("repetitions"),
    completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("set_log_unique").on(t.workoutSessionId, t.workoutExerciseId, t.setNumber)],
);

export const progressEntries = pgTable("progress_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  entryDate: date("entry_date", { mode: "date" }).notNull(),
  weightKg: numeric("weight_kg", { precision: 6, scale: 2 }),
  waistCm: numeric("waist_cm", { precision: 6, scale: 2 }),
  hipsCm: numeric("hips_cm", { precision: 6, scale: 2 }),
  thighCm: numeric("thigh_cm", { precision: 6, scale: 2 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const progressPhotos = pgTable("progress_photos", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  programDay: integer("program_day").notNull(),
  storagePath: text("storage_path").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const supportThreads = pgTable("support_threads", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  specialistId: text("specialist_id"),
  status: supportStatusEnum("status").default("open").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const supportMessages = pgTable("support_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  threadId: uuid("thread_id").references(() => supportThreads.id, { onDelete: "cascade" }).notNull(),
  senderId: text("sender_id").notNull(),
  message: text("message").notNull(),
  attachmentPath: text("attachment_path"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  readAt: timestamp("read_at", { withTimezone: true }),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  triggerType: text("trigger_type").notNull(),
  triggerValue: integer("trigger_value").notNull(),
});

export const userAchievements = pgTable(
  "user_achievements",
  {
    userId: text("user_id").notNull(),
    achievementId: integer("achievement_id").references(() => achievements.id, { onDelete: "cascade" }).notNull(),
    unlockedAt: timestamp("unlocked_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.achievementId] })],
);
