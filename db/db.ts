// TODO: look into drizzle to connect to sqlite
// https://orm.drizzle.team/docs/sql-schema-declaration
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { games } from './schema';

const db = drizzle();
// const db = drizzle({ connection: process.env.DATABASE_URL, casing: 'snake_case' })
// to automatically convert typescript camelCase to sqlite snake_case

const result = await db.select().from(games);
