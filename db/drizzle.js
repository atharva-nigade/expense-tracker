import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const sql = neon("postgresql://neondb_owner:IbqO7fy1edMs@ep-sweet-recipe-a5sc47nj.us-east-2.aws.neon.tech/expense_db?sslmode=require");
export const db = drizzle({ client: sql });