import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function RequireAuth({children}) {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', {
                replace: true,
                state: { from: location },
            });
        }
    }, [isAuthenticated, navigate, location]);

    return isAuthenticated ? children : <p>Redirecting to login...</p>;
}