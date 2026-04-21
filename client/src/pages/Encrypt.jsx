import { useRequireUser } from "../hooks/useRequireUser";
import { useState } from "react";
import { useNavigate } from "react-router";

function Encrypt() {
    const user = useRequireUser();
    const [message, setMessage] = useState("");
    const [algorithm, setAlgorithm] = useState("caesar");

    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("/api/ciphers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message, algorithm })
        });

        const cipher = await response.json();
        console.log("Cipher created:", cipher);

        if (response.ok) {
            navigate(`/cipher/${cipher.id}`);
        } else {
            console.error("Failed to create cipher");
        }

    }

    return (
        <div>
            <h2>Welcome to the Encryption Page</h2>
            <div>
                Type your message here and select which encryption algorithm you want to use.
                Submitting your message with encrypt it with the chosen algorithm and save it to the server.
                Only you will be able to see and decrypt your messages.
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <label htmlFor="algorithm">Algorithm:</label>
                <select id="algorithm" name="algorithm" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                    <option value="caesar">Caesar Cipher</option>
                    <option value="hill">Hill Cipher</option>
                </select>
                <button type="submit">Encrypt</button>
            </form>
        </div>
    )
}

export default Encrypt;