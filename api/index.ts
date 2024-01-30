import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const db = drizzle(sql);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export default async (req: Request, ctx: any) => {
  const result = await db.select().from(users);
  return new Response(JSON.stringify(result, null, 2));
}

export const config = {
  runtime: 'edge',
  regions: ['fra1'],  // fra1 = Frankfurt: pick the Vercel region nearest your Neon DB
};
