import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";

const sql = neon(process.env.NEXT_PUBLIC_DBURL);
const db = drizzle(sql);
const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "./lib/migrations" });
    console.log("Migration completed");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
};
main();