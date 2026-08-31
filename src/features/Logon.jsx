import { useState } from "react"
import { useAuth } from "../contexts/AuthContext";

export default function Logon() {
    const { login } = useAuth();
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [isLoggingOn, setIsLoggingOn] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoggingOn(true);
        setAuthError("");

        try{ 
            const response = await login(email, password);

            if (response.success) {
                setIsLoggingOn(false);
            } else {
                setAuthError(response.error);
                setIsLoggingOn(false);
            }
        } catch (error) {
            setAuthError(`Error: ${error.name} | ${error.message}`);
            setIsLoggingOn(false);
        } 
    }
    return (
        <form onSubmit={handleSubmit}>
            {authError && (
                <div>
                    {authError}
                </div>
            )}
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={event => {setEmail(event.target.value)}}

            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={event => {setPassword(event.target.value)}}
            />

            <button 
                type="submit"
                disabled={isLoggingOn}
            >
                {
                    isLoggingOn ?
                    "Logging in..." :
                    "Log On"
                }
            </button>
        </form>
    )
}
