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
        } else {
            ciphertext += caesarShift(char, key);
        }
    }

    return { ciphertext, key };

}

export function decryptCaesar(ciphertext, key) {
    
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