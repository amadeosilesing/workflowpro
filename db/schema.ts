import { pgTable, serial, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";

// ── USERS ──────────────────────────────────────────────
export const users = pgTable("users", {
  idUsers:   serial("idUsers").primaryKey(),
  name:      varchar("name", { length: 100 }).notNull(),
  email:     varchar("email", { length: 150 }).notNull().unique(),
  password:  varchar("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── PROJECTS ───────────────────────────────────────────
export const projects = pgTable("projects", {
  idProjects:  serial("idProjects").primaryKey(),
  name:        varchar("name", { length: 150 }).notNull(),
  description: text("description"),
  userId:      integer("user_id")
                .notNull()
                .references(() => users.idUsers, { onDelete: "cascade" }),
  createdAt:   timestamp("created_at").defaultNow().notNull(),
  updatedAt:   timestamp("updated_at").defaultNow().notNull(),
});

// ── TASKS ──────────────────────────────────────────────
export const tasks = pgTable("tasks", {
  idTasks:     serial("idTasks").primaryKey(),
  title:       varchar("title", { length: 150 }).notNull(),
  description: text("description"),
  status:      varchar("status", { length: 20 }).default("todo").notNull(),
  projectId:   integer("project_id")
                .notNull()
                .references(() => projects.idProjects, { onDelete: "cascade" }),
  createdAt:   timestamp("created_at").defaultNow().notNull(),
  updatedAt:   timestamp("updated_at").defaultNow().notNull(),
});

// ── TYPES ──────────────────────────────────────────────
export type User       = typeof users.$inferSelect;
export type NewUser    = typeof users.$inferInsert;
export type Project    = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Task       = typeof tasks.$inferSelect;
export type NewTask    = typeof tasks.$inferInsert;