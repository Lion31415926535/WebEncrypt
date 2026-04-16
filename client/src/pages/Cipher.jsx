import { useRequireUser } from "../hooks/useRequireUser";

function Cipher() {
    const user = useRequireUser();

    return (
        <div>This is the cipher page</div>
    )
}

export default Cipher;