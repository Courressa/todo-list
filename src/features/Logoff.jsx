import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Logoff() {
    const { logout } = useAuth();
    const [authError, setAuthError] = useState("");
    const [isLoggingOff, setIsLoggingOff] = useState(false);

    const handleLogoff = async () => {
        setIsLoggingOff(true);
        setAuthError("");

        try {
            const response = await logout();

            if (!response.success) {
                setAuthError(response.error);
            }
        } catch (error) {
            setAuthError(`Error: ${error.name} | ${error.message}`);
        } finally {
            setIsLoggingOff(false);
        }
    };

    return (
        <div>
            {authError && (
                <div>
                    {authError}
                </div>
            )}
            <button onClick={handleLogoff} disabled={isLoggingOff}>
                {isLoggingOff ? "Logging off..." : "Logoff"}
            </button>
        </div>
    );
}