import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./configs/schema.js",
    out: "./drizzle",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://moneydb_owner:ySLAKY1DI8wB@ep-dry-moon-a5wpehsh.us-east-2.aws.neon.tech/AI-Form-Builder?sslmode=require',
    }
});