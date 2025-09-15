import { drizzle } from "drizzle-orm/neon-http"; //imports drizzle orm client for neon postgres over HTTP
import { neon } from "@neondatabase/serverless"; //importa neons official client
import { ENV } from './env.js';
import * as schema from "../db/schema.js";

const sql = neon(ENV.DATABASE_URL);
export const db = drizzle(sql,{schema});