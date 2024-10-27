import type { Config } from "drizzle-kit";

// @ts-ignore
const config: Config = {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "better-sqlite",
  dialect: "sqlite",
  dbCredentials: {
    url: "./todoapp.db",
  },
};

export default config;
