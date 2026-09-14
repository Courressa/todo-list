
import { useAuth } from "../contexts/AuthContext";
import Logoff from "../features/Logoff";
import Navigation from "./Navigation";
import styled from "styled-components";

const Bar = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem 1.25rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.bp.tablet}) {
    padding: 0.85rem 1.75rem;
    justify-content: space-between;
  }
`;

const Title = styled.h1`
  flex: 1 0 100%;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.bp.tablet}) {
    flex: 0 0 auto;
    text-align: left;
  }
`;

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <Bar>
      <Title>Todo List</Title>
      <Navigation />
      {isAuthenticated && <Logoff />}
    </Bar>
  )
}
