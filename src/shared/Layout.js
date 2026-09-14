import styled, { keyframes } from 'styled-components';

export const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  flex: 1;
  width: 100%;
`;

export const Page = styled.div`
  width: min(760px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 1.5rem 0 3.5rem;
`;

export const Alert = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid ${({ $tone, theme }) => $tone === 'error' ? theme.colors.error : theme.colors.border};
  background: ${({ $tone, theme }) => $tone === 'error' ? '#FEF3F2' : theme.colors.surface};
  color: ${({ $tone, theme }) => $tone === 'error' ? theme.colors.error : theme.colors.ink};

  p {
    margin: 0;
    flex: 1;
    min-width: 12rem;
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 22px;
  height: 22px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

export const LoadingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
  padding: 1.5rem 1rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1.25rem;
  color: ${({ theme }) => theme.colors.muted};

  p {
    margin: 0 auto;
    max-width: 36ch;
  }
`;