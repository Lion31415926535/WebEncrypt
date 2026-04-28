import { matrix, inv, det, transpose, multiply } from "mathjs";

export function encryptHill(message) {
    message = message.toLowerCase();
    
    // Pads message with spaces until its length is divisible by 3
    while (message.length % 3 !== 0) {
        message += " ";
    }

    message = validateText(message);

    let key = generateKey();
    const messageMatrix = parseMessage(message);

    const cipherMatrix = multiply(key, messageMatrix);

    key = key._data;
    const ciphertext = codeToChar(cipherMatrix._data);

    return { ciphertext, key }
}

export function decryptHill(ciphertext, key) {
    key = matrix(key);

    ciphertext = matrix(charToCode(ciphertext));

    let plaintext = multiply(inv(key), ciphertext);
    plaintext._data = roundMatrix(plaintext._data);

    plaintext = unparseMessage(plaintext._data);

    return plaintext;
}

// Replaces any invalid characters with ?
function validateText(message) {
    const validChars = "abcdefghijklmnopqrstuvwxyz. ?";
    let newMessage = "";
    for (let char of message) {
        if (validChars.includes(char)) {
            newMessage += char;
        } else {
            newMessage += "?";
        }
    }
    return newMessage;
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

    console.log("Parsing: " + outerArray);
    return transpose(matrix(outerArray));
}

function unparseMessage(matrixData) {
    matrixData = transpose(matrixData);

    let message = "";
    for (let i=0; i < matrixData.length; i++) {
        for (let j=0; j < matrixData[i].length; j++) {
            const charValue = matrixData[i][j];

            if (charValue === 26) {
                message += " ";
            } else if (charValue === 27) {
                message += "."
            } else if (charValue === 28) {
                message += "?"
            } else {
                message += String.fromCharCode(charValue + 97);
            }
        }
    }

    return message;
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

function charToCode(matrixData) {
    for (let i=0; i < matrixData.length; i++) {
        for (let j=0; j < matrixData[i].length; j++) {
            matrixData[i][j] = matrixData[i][j].codePointAt(0);
        }
    }
    return matrixData;
}

function roundMatrix(matrixData) {
    for (let i=0; i < matrixData.length; i++) {
        for (let j=0; j < matrixData[i].length; j++) {
            matrixData[i][j] = Math.round(matrixData[i][j]);
        }
    }
    return matrixData;
}