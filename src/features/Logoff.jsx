import { useAuth } from "../contexts/AuthContext";

export default function Logoff() {
    const { logout } = useAuth();

    const handleLogoff = () => {
        logout();
    };

    return (
        <button onClick={handleLogoff}>Logoff</button>
    );
}