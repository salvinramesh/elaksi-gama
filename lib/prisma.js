// lib/prisma.js
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;
// Optional: enable fetch-based pool queries (keeps it safe for some serverless envs)
neonConfig.poolQueryViaFetch = true;

const connectionString = process.env.DATABASE_URL || '';

if (!connectionString) {
  console.error('lib/prisma.js: DATABASE_URL is not set. Make sure .env is loaded.');
}

// create adapter with the connection string
const adapter = new PrismaNeon({ connectionString });

// Use singleton to avoid too many clients in dev
let prisma = global.prisma;
if (!prisma) {
  // Always pass adapter for Neon
  prisma = new PrismaClient({ adapter });
  if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma;
  }
}

// quick connect attempt to show clearer error during dev startup
// Note: we intentionally don't await this in module scope; call connect and catch
prisma.$connect().then(() => {
  console.log('Prisma: connected to database (Neon).');
}).catch((err) => {
  console.error('Prisma: connection failed:', err && (err.message || err));
});

export default prisma;
