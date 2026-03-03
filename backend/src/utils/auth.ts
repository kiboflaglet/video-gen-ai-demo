import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "../../generated/prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: ["http://localhost:5173"],
  emailAndPassword: {
    enabled: true,
  },
});
