import { NavLink } from "react-router";
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
    const { isAuthenticated } = useAuth();

    const navLinkStyle = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'underline' : 'none',
        };
    }

    return (
        <nav>
            <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
                {!isAuthenticated && (<NavLink to="/login" style={navLinkStyle}>Login</NavLink>)}
                <NavLink to="/about" style={navLinkStyle}>About</NavLink>
                {isAuthenticated && (
                    <>
                        <NavLink to="/todos" style={navLinkStyle}>Todos</NavLink>
                        <NavLink to="/profile" style={navLinkStyle}>Profile</NavLink>
                    </>
                )}
            </ul>
        </nav>
    );
}