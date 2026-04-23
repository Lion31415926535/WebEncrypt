import { matrix, inv, det } from "mathjs";

export function encryptHill(message) {
    message = message.toLowerCase();

    if (!validateText(message)) {
        return null
    }

    const key = generateKey();




}

export function decryptHill(ciphertext, key) {

}

function validateText(message) {
    const validChars = "abcdefghijklmnopqrstuvwxyz1234567890. ?";
    for (let char of message) {
        if (!validChars.includes(char)) {
            return false;
        }
    }
    return true;
}

// Generates a 3x3 matrix for the key
function generateKey() {
    let key = matrix([[0,0,0],[0,0,0],[0,0,0]]);

    // Makes sure key is invertible
    while (det(key) === 0) {
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                key._data[i][j] = Math.floor(Math.random() * 29);
            }
        }
    }

    return key;
}