import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import Button from "../shared/Button";
import { Alert } from "../shared/Layout";

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
                setError('Unable to log off. Please try again.' );
            }
        } catch (error) {
            setError('Unable to log off. Please try again.');
        } finally {
            setIsLoggingOff(false);
        }
    };

    return (
        <div>
            {error && (
                <Alert $tone="error">
                    <p>{error}</p>
                </Alert>
            )}
            <Button $variant="ghost" onClick={handleLogoff} disabled={isLoggingOff}>
                {isLoggingOff ? "Logging off..." : "Logoff"}
            </Button>
        </div>
    );
}