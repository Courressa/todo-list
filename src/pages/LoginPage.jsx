import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import Button from '../shared/Button';
import { Page, Alert } from '../shared/Layout';
import { Field, Label, Input } from '../shared/TextInputWithLabel';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 24rem;
  margin-left: auto;
  margin-right: auto;
`;

export default function LoginPage() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [isLoggingOn, setIsLoggingOn] = useState(false);
    const hasRedirected = useRef(false);
    
    // Get intended destination from location state, default to /todos
    const from = location.state?.from?.pathname || '/todos';

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && !hasRedirected.current) {
            hasRedirected.current = true;
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoggingOn(true);
        setAuthError("");

        try{ 
            const response = await login(email, password);

            if (response.success) {
                hasRedirected.current = true;
                navigate(from, { replace: true });
            } else {
                setAuthError('Unable to log on. Check your email and password and try again.');
            }
        } catch (error) {
            setAuthError('Unable to log on. Check your email and password and try again.');
        } finally {
            setIsLoggingOn(false);
        }
    }
    return (
        <Page>
            <Form onSubmit={handleSubmit}>
                {authError && (
                    <Alert $tone="error">
                        <p>{authError}</p>
                    </Alert>
                )}
                <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={event => {setEmail(event.target.value)}}
                        maxLength={254}
                        required
                    />
                </Field>
                <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={event => {setPassword(event.target.value)}}
                        maxLength={128}
                        required
                    />
                </Field>
                <Button type="submit" disabled={isLoggingOn}>
                    {
                        isLoggingOn ?
                        "Logging in..." :
                        "Log On"
                    }
                </Button>
                
            </Form>
        </Page>
    )
}
