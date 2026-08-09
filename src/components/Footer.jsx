export default function Footer() {
  const browserLanguage = typeof navigator === 'undefined' ? 'en-US' : navigator.language;

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-copy">TimePlanner Pro · A clearer way to plan your day.</div>
        <div className="footer-note">Created by Mohamed Sobhy Maher · {browserLanguage} · © {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}