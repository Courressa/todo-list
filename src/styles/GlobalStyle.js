import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *, 
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: ${({ theme }) => theme.fonts.body};
        background: ${({ theme }) => theme.colors.bg};
        color: ${({ theme }) => theme.colors.ink};
    }

    h1, h2, h3 {
        font-family: ${({ theme }) => theme.fonts.display};
    }

    h2 {
        margin: 0 0 1rem;
    }

    h3 {
        margin: 1rem 0 0.5rem;
    }
`;