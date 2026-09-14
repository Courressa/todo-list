import { NavLink } from "react-router";
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const StyledLink = styled(NavLink)`
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 0.75rem;
    border-radius: 12px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.ink};
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.surface};
    }

    &.active {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: 700;
        background: ${({ theme }) => theme.colors.surface};
    }

    &:focus-visible {
        outline: 3px solid ${({ theme }) => theme.colors.focusRing};
        outline-offset: 2px;
    }
`;

export default function Navigation() {
    const { isAuthenticated } = useAuth();

    return (
        <nav>
            <List>
                {!isAuthenticated && (
                    <li>
                        <StyledLink to="/login" >Login</StyledLink>
                    </li>
                )}
                <li>
                    <StyledLink to="/about" >About</StyledLink>
                </li>
                {isAuthenticated && (
                    <>
                        <li>
                            <StyledLink to="/todos" >Todos</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/profile" >Profile</StyledLink>
                        </li>
                    </>
                )}
            </List>
        </nav>
    );
}