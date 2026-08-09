import { Link } from 'react-router-dom';

const features = [
  { number: '01', title: 'See the day', text: 'Capture the details that matter: a date, a time, and the context behind the task.' },
  { number: '02', title: 'Stay in rhythm', text: 'Clear status labels make it easy to spot what is next, what is due, and what needs attention.' },
  { number: '03', title: 'Keep it close', text: 'Your plan stays in this browser, ready whenever you sit down to work.' },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">A practical daily planner</div>
            <h1>Make time for what <em>matters.</em></h1>
            <p className="hero-copy">TimePlanner Pro turns a loose list of intentions into a plan you can actually follow. Add the task, give it a place in your day, and get on with it.</p>
            <div className="hero-actions">
              <Link to="/tasks" className="button button-primary">Open my task list <span aria-hidden="true">→</span></Link>
              <Link to="/about" className="button button-secondary">How it works</Link>
            </div>
          </div>
          <div className="hero-aside" aria-label="Example daily plan">
            <div className="aside-top"><span className="aside-date">TUESDAY · YOUR PLAN</span><span className="aside-dot" /></div>
            <div className="mini-task"><span className="mini-check" /><div><strong>Read chapter three</strong><span>09:30 · STUDY</span></div></div>
            <div className="mini-task"><span className="mini-check" /><div><strong>Send project outline</strong><span>13:00 · WORK</span></div></div>
            <div className="mini-task"><span className="mini-check" /><div><strong>Pick up groceries</strong><span>17:45 · PERSONAL</span></div></div>
          </div>
        </div>
      </section>
      <section className="features container">
        <div className="feature-intro">
          <div><div className="eyebrow">Less friction, more follow-through</div><h2 className="section-heading">Planning should feel useful.</h2></div>
          <p>No accounts, no noisy dashboards, no complicated setup. Just a focused place to make a good plan.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => <article className="feature-card" key={feature.number}><div className="feature-number">{feature.number}</div><h3>{feature.title}</h3><p>{feature.text}</p></article>)}
        </div>
        <div className="home-callout">
          <div className="eyebrow">Start where you are</div>
          <p>The best plan is the one that reflects your actual day. Add one task, then build from there.</p>
        </div>
      </section>
    </>
  );
}