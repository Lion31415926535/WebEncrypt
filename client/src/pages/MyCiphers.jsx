import { useRequireUser } from "../hooks/useRequireUser";

function MyCiphers() {
    const user = useRequireUser();

    return (
        <div>This is the my ciphers page</div>
    )
}

export default MyCiphers;