import pool from "../db/connection.js";

// Checks if the user is authorized to access the cipher
function isAuthorized(userId, cipherUserId) {
    return userId === cipherUserId;
}

export async function createCipher(userId, ciphertext, algorithm, key) {
    const result = await pool.query(
        "INSERT INTO ciphers (user_id, ciphertext, algorithm, key) VALUES ($1, $2, $3, $4) RETURNING *",
        [userId, ciphertext, algorithm, key]);
    return result.rows[0];
}

export async function getCipherById(id, userId) {
    const result = await pool.query(
        "SELECT * FROM ciphers WHERE id = $1",
        [id]);
    const cipher = result.rows[0];
    if (isAuthorized(userId, cipher.user_id)) {
        return cipher;
    } else {
        return null;
    }
}