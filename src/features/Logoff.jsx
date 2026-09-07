import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function Logoff() {
    const { logout } = useAuth();
    const [error, setError] = useState("");
    const [isLoggingOff, setIsLoggingOff] = useState(false);
    const navigate = useNavigate();

    const handleLogoff = async () => {
        setIsLoggingOff(true);
        setError("");

        try {
            const response = await logout();

            if (response.success) {
                navigate("/login");
            } else { 
                setError(response.error);
            }
        } catch (error) {
            setError(`Error: ${error.name} | ${error.message}`);
        } finally {
            setIsLoggingOff(false);
        }
    };

    return (
        <div>
            {error && (
                <div>
                    {error}
                </div>
            )}
            <button onClick={handleLogoff} disabled={isLoggingOff}>
                {isLoggingOff ? "Logging off..." : "Logoff"}
            </button>
        </div>
    );
}