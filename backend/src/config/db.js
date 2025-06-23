import {neon} from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.DATABASE_URL;
export const sql = neon(db)

export async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Error initializing the database:", error);
        process.exit(1);

    }
}