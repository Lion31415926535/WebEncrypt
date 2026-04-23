export function encryptCaesar(message) {
     message = message.toLowerCase();

    if (!validateText(message)) {
        return null;
    }

    const key = generateKey();
    let ciphertext = "";

    for (let char of message) {
        if (char === " ") {
            ciphertext += " ";
        } else if (char === ".") {
            ciphertext += ".";
        } else if (char === "?") {
            ciphertext += "?";
        } else if (char >= "0" && char <= "9") {
            ciphertext += char;
        } else {
            ciphertext += caesarShift(char, key);
        }
    }

    return { ciphertext, key };

}

export function decryptCaesar(ciphertext, key) {
    let message = "";

    for (let char of ciphertext) {
        if (char === " ") {
            message += " ";
        } else if (char === ".") {
            message += ".";
        } else if (char === "?") {
            message += "?";
        } else if (char >= "0" && char <= "9") {
            message += char;
        } else {
            message += caesarShift(char, 26 - key);
        }
    }

    return message;
}

// Checks to make sure message only contains valid characters
function validateText(message) {
    const validChars = "abcdefghijklmnopqrstuvwxyz1234567890. ?";
    for (let char of message) {
        if (!validChars.includes(char)) {
            return false;
        }
    }
    return true;
}

function generateKey() {
    return Math.floor(Math.random() * 25) + 1;
}

function caesarShift(char, key) {
    let charCode = char.charCodeAt(0);
    charCode -= 97;
    charCode = (charCode + key) % 26;
    charCode += 97;
    return String.fromCharCode(charCode);
}