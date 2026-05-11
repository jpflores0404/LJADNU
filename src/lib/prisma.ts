import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;
  const useTursoInDev = process.env.USE_TURSO_IN_DEV === "true";
  const shouldUseTurso =
    Boolean(tursoUrl && tursoAuthToken) &&
    (process.env.NODE_ENV === "production" || useTursoInDev);

  if (shouldUseTurso && tursoUrl && tursoAuthToken) {
    const libsql = createClient({
      url: tursoUrl,
      authToken: tursoAuthToken,
    });
    const adapter = new PrismaLibSQL(libsql);
    return new PrismaClient({ adapter });
  }

  const databaseUrl = process.env.DATABASE_URL || "file:/tmp/dev.db";
  return new PrismaClient({ datasourceUrl: databaseUrl });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
