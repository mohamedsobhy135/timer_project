import { Link } from 'react-router-dom';

export default function NotFound() {
  return <div className="container not-found"><div><h1>404</h1><h2>That page is not on today’s plan.</h2><p>Try heading back to the start and choosing a different next step.</p><Link to="/" className="button button-primary">Back to home</Link></div></div>;
}