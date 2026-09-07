import { Link, useLocation } from 'react-router';

export default function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <section>
      <h2>404: Not Found</h2>
      <p>{pathname}</p>
      <nav aria-label="Main navigation">
        <Link to="/">Home</Link>{' | '}
        <Link to="/todos">Todos</Link>{' | '}
        <Link to="/about">About</Link>{' | '}
        <Link to="/profile">Profile</Link>
      </nav>
    </section>
  );
}