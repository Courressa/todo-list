import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [isLoggingOn, setIsLoggingOn] = useState(false);
    
    // Get intended destination from location state, default to /todos
    const from = location.state?.from?.pathname || '/todos';

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoggingOn(true);
        setAuthError("");

        try{ 
            const response = await login(email, password);

            if (response.success) {
                navigate(from, { replace: true });
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
