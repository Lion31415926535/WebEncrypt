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

export async function getCiphersByUserId(userId) {
    const result = await pool.query(
        "SELECT * FROM ciphers WHERE user_id = $1",
        [userId]);
    if (isAuthorized(userId, result.rows[0].user_id)) {
        return result.rows;
    } else {
        return null;
    }
}

export async function deleteCipher(id, userId) {
    if (isAuthorized(userId, (await getCipherById(id, userId)).user_id)) {
        await pool.query(
            "DELETE FROM ciphers WHERE id = $1",
            [id]);
        return true;
    }
    return false;
}