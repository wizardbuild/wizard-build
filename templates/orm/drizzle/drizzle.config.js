// drizzle.config.js

import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.js',
    dialect: process.env.DATABASE_PROVIDER!,
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
