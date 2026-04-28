import { useRequireUser } from "../hooks/useRequireUser";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

function Cipher() {
    const user = useRequireUser();
    const navigate = useNavigate();
    const { id } = useParams();

    const [cipher, setCipher] = useState("");
    const [algorithm, setAlgorithm] = useState("");
    const [isDecrypted, setIsDecrypted] = useState(false);

    useEffect(() => {
        async function fetchCipher() {
            const response = await fetch(`/api/ciphers/${id}`);
            const data = await response.json();
            setCipher(data.cipher_data.ciphertext);
            setAlgorithm(data.algorithm);
        }

        fetchCipher();
    }, []);

    async function handleDecrypt() {
        const response = await fetch(`/api/ciphers/${id}/decrypt`);
        const data = await response.json();
        setCipher(data.message);
        setIsDecrypted(true);
    }

    async function handleDelete() {
        const response = await fetch(`/api/ciphers/${id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            navigate("/my-ciphers");
        }
    }


    return (
        <div className="card" style={{ maxWidth: "600px", margin: "2rem auto" }}>
            <h2>Welcome to the Cipher Page</h2>
            <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ marginBottom: "0.75rem" }}>
                    <strong>Message:</strong> {cipher}
                </p>
                <p>
                    <strong>Encryption Algorithm:</strong> {algorithm}
                </p>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
                {!isDecrypted && (
                    <button onClick={handleDecrypt} className="btn btn-primary">Decrypt</button>
                )}
                <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}

export default Cipher;