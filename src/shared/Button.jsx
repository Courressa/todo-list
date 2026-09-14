import styled from 'styled-components';

const Button = styled.button`
  min-height: 44px;
  min-width: 44px;
  padding: 0 1rem;
  border-radius: 12px;
  border: 1px solid transparent;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, opacity 0.15s ease;

  background: ${({ $variant, theme }) =>
    $variant === 'ghost' ? 'transparent' : theme.colors.accent};
  color: ${({ $variant, theme }) =>
    $variant === 'ghost' ? theme.colors.ink : '#fff'};

  &:hover:not(:disabled) {
    background: ${({ $variant, theme }) =>
      $variant === 'ghost' ? theme.colors.surface : theme.colors.accent};
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Button;