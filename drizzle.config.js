// import 'dotenv/config';
// import { defineConfig } from 'drizzle-kit';

// export default defineConfig({
//   out: './drizzle',
//   schema: './utils/schema.js',
//   dialect: 'postgresql',
//   dbCredentials: {
//     host: "ep-sweet-recipe-a5sc47nj.us-east-2.aws.neon.tech", // Database host
//     database: "expense_db", // Database name
//     user: "neondb_owner", // Database user
//     password: "IbqO7fy1edMs", // Database password
//     ssl: true,
//   },
// });

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    host: "ep-sweet-recipe-a5sc47nj.us-east-2.aws.neon.tech", // Database host
    database: "expense_db", // Database name
    user: "neondb_owner", // Database user
    password: "IbqO7fy1edMs", // Database password
    ssl: true,
  },
});
