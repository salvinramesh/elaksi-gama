// lib/prisma.js
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL || '';
if (!connectionString) {
  console.error('lib/prisma.js: DATABASE_URL/DIRECT_URL not found in env.');
}

// Configure neonConfig only if adapter will be used
neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = true;

// Use adapter only in serverless/edge or when explicitly requested
const shouldUseNeonAdapter =
  process.env.NEXT_RUNTIME === 'edge' || process.env.USE_NEON_ADAPTER === 'true';

let prisma;

if (shouldUseNeonAdapter) {
  const adapter = new PrismaNeon({ connectionString });
  prisma = global.prisma || new PrismaClient({ adapter });
  if (process.env.NODE_ENV === 'development') global.prisma = prisma;
  prisma.$connect().then(() => {
    console.log('Prisma: connected to DB using PrismaNeon adapter.');
  }).catch((err) => {
    console.error('Prisma: Neon adapter connection failed:', err);
  });
} else {
  // Use default client (regular TCP Postgres)
  prisma = global.prisma || new PrismaClient();
  if (process.env.NODE_ENV === 'development') global.prisma = prisma;
  prisma.$connect().then(() => {
    console.log('Prisma: connected to DB using default connector.');
  }).catch((err) => {
    console.error('Prisma: default connector connection failed:', err);
  });
}

export default prisma;
