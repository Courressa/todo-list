import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');

    const login = async (userEmail, password) => {
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, password }),
                credentials: 'include',
            };
            
            const res = await fetch('/api/users/logon', options);
            const data = await res.json();
            
            if (res.status === 200 && data.name && data.csrfToken) {
                setUserName(data.name);
                setToken(data.csrfToken);
                return { success: true };
            } else {
                return {
                    success: false,
                    error: `Authentication failed: ${data?.message}`,
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Network error during login',
            };
        }
    };

    const logout = async () => {
        // No token means already logged out locally, skip the server call
        if (!token) {
            setUserName('');
            setToken('');
            return { success: true };
        }

        try {
            const options = {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': token },
                credentials: 'include',
            };

            const res = await fetch('/api/users/logoff', options);

            // Logoff may return an empty body, so JSON parsing can fail.
            let data = {};
            try {
                data = await res.json();
            } catch {
                data = {};
            }

            if (res.status === 200) {
                return { success: true };
            } else {
                return {
                    success: false,
                    error: `Authentication failed during logout: ${data?.message}`,
                };
            }
        } catch (error) {
            return {
                success: false,
                error: 'Network error during logout',
            };
        } finally {
            // Always clear local session, even if the server logoff fails.
            setUserName('');
            setToken('');
        }
    };

    const value = {
        userName,
        token,
        isAuthenticated: !!token,
        login,
        logout,
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}