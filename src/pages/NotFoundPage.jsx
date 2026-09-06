import { Link, useLocation } from 'react-router';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section>
      <h2>404: Not Found</h2>
      <p>{pathname}</p>
      <Link to="/">Back Home</Link>
    </section>
  );
}