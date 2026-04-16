import { useRequireUser } from "../hooks/useRequireUser";

function Encrypt() {
    const user = useRequireUser();

    return (
        <div>This is the encryption page</div>
    )
}

export default Encrypt;