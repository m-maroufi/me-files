import * as userSchema from "@/lib/db/schema/auth-schema";
import * as filesSchema from "@/lib/db/schema/filesTable";
import { drizzle } from "drizzle-orm/neon-http";
export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    ...userSchema,
    ...filesSchema,
  },
});
