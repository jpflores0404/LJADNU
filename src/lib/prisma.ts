import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const databaseUrl = process.env.DATABASE_URL || "file:./prisma/dev.db";

function createPrismaClient() {
  return new PrismaClient({ datasourceUrl: databaseUrl });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
