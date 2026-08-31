import { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook with error checking
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    // State for authentication
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    
    // Functions will go here...
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
                // Success: Update state
                setEmail(data.name);
                setToken(data.csrfToken);
                return { success: true };
            } else {
                // Failure: Return error
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
            setEmail('');
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

            // Body may be empty on logoff, so don't assume it's valid JSON
            let data = {};
            try {
                data = await res.json();
            } catch {
                // No JSON body to parse, ignore
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
            // Clear local state regardless of server response
            setEmail('');
            setToken('');
        }
    };
    
    // Context value object
    const value = {
        email,
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