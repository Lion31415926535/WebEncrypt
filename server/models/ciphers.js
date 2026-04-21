import pool from "../db/connection.js";

export async function createCipher(userId, ciphertext, algorithm, key) {
    const result = await pool.query(
        "INSERT INTO ciphers (user_id, ciphertext, algorithm, key) VALUES ($1, $2, $3, $4) RETURNING *",
        [userId, ciphertext, algorithm, key]);
    return result.rows[0];
}