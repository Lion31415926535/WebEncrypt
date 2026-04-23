import { matrix, inv, det, transpose, multiply } from "mathjs";

export function encryptHill(message) {
    message = message.toLowerCase();
    
    // Pads message with spaces until its length is divisible by 3
    while (message.length % 3 !== 0) {
        message += " ";
    }

    if (!validateText(message)) {
        return null
    }

    const keyMatrix = generateKey();
    const messageMatrix = parseMessage(message);

    const cipherMatrix = multiply(keyMatrix, messageMatrix);

    const ciphertextMatrix = codeToChar(transpose(cipherMatrix)._data); // Converts each entry of cipher into characters
    const ciphertext = matrixToText(ciphertextMatrix);
    const key = matrixToText(keyMatrix._data);

    return { ciphertext, key }
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

// Generates a 3x3 key for the matrix
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

// Parses the message into a 3xn matrix
function parseMessage(message) {
    let outerArray = [];
    // Iterates by three through message
    for (let i=0; i < message.length; i += 3) {
        let innerArray = [];
        
        // Calculates code for next three characters
        for (let j=0; j<3; j++) {
            const character = message.charAt(i + j);
            let charCode = 0;
            if (character === " ") {
                charCode = 26
            } else if (character === ".") {
                charCode = 27;
            } else if (character === "?") {
                charCode = 28;
            } else {
                charCode = character.charCodeAt(0) - 97;
            }

            innerArray.push(charCode);
        }
        outerArray.push(innerArray);
    }

    return transpose(matrix(outerArray));
}

// Takes a 2d array and returns a string of the contents of its rows
function matrixToText(matrixData) {
    let text = "";
    for (let i=0; i < matrixData.length; i++) {
        for (let j=0; j < matrixData[i].length; j++) {
            text += matrixData[i][j];
        }
    }

    return text;
}

// Iterates through a 2d array and converts character codes into letters
function codeToChar(matrixData) {
    for (let i=0; i < matrixData.length; i++) {
        for (let j=0; j < matrixData[i].length; j++) {
            matrixData[i][j] = String.fromCharCode(matrixData[i][j]);
        }
    }
    return matrixData;
}

/*
TODO: 
Decryption:
- Convert key and cipher into matrices
- Multiply by inverse (and round) to get plaintext
- Return plaintext as text
*/