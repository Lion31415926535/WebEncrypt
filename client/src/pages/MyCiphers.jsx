import { useRequireUser } from "../hooks/useRequireUser";
import { useState, useEffect } from "react";
import { Link } from "react-router";

function MyCiphers() {
    const user = useRequireUser();
    const [ciphers, setCiphers] = useState([]);

    useEffect(() => {
        async function fetchMyCiphers() {
            const response = await fetch("/api/ciphers/my-ciphers");
            const data = await response.json();
            setCiphers(data.ciphers);
        }

        fetchMyCiphers();
    }, []);

    return (
        <div>
            <h2>My Ciphers</h2>
            {ciphers.map(cipher => (
                <div key={cipher.id}>
                    <Link to={`/cipher/${cipher.id}`}>{cipher.algorithm} - {cipher.ciphertext}</Link>
                </div>
            ))}
        </div>
    )
}

export default MyCiphers;