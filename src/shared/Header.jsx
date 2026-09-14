
import { useAuth } from "../contexts/AuthContext";
import Logoff from "../features/Logoff";
import Navigation from "./Navigation";
import styled from "styled-components";

const Bar = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.25rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <Bar>
      <h1>Todo List</h1>
      <Navigation />
      {isAuthenticated && <Logoff />}
    </Bar>
  )
}
