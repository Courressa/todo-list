import { Link, useLocation } from 'react-router';
import { Page } from '../shared/Layout';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 0.75rem;
  border-radius: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export default function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <Page>
      <h2>404: Not Found</h2>
      <p>{pathname}</p>
      <nav aria-label="Main navigation">
        <StyledLink to="/">Home</StyledLink>{' | '}
        <StyledLink to="/todos">Todos</StyledLink>{' | '}
        <StyledLink to="/about">About</StyledLink>{' | '}
        <StyledLink to="/profile">Profile</StyledLink>
      </nav>
    </Page>
  );
}