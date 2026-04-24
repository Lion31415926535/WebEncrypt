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
        <div>
            <h2>Welcome to the Cipher Page</h2>
            <div>
                Message: {cipher}
            </div>
            <div>
                Encryption Algorithm: {algorithm}
            </div>
            {!isDecrypted && (
                <button onClick={handleDecrypt}>Decrypt</button>
            )}
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Cipher;