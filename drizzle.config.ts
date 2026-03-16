import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  driver: "expo",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "sqlite://./db/wakeupbrah.db",
  },
});
