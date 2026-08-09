import { Link } from 'react-router-dom';

const principles = [
  ['Simple by default', 'The important information is always visible. You never need to learn a new system before making your first plan.'],
  ['Honest status', 'A task is overdue, due today, or upcoming based on its date and time—not on a separate checkbox to maintain.'],
  ['Your data stays yours', 'Tasks are saved locally in your browser. TimePlanner Pro works as a small, dependable tool without an account.'],
  ['Made for learning', 'Use categories to separate study, work, personal errands, and everything else competing for your attention.'],
];

export default function About() {
  return (
    <div className="container about-page">
      <section className="about-intro">
        <div><div className="eyebrow">About TimePlanner Pro</div><h1 className="page-heading">A planner with both feet on the ground.</h1><p className="page-lede">TimePlanner Pro was designed from a learner’s point of view: practical enough for a busy afternoon, clear enough to understand at a glance, and flexible enough to change when the day does.</p></div>
        <aside className="about-note"><p>“A plan is not a promise to do everything. It is a way to decide what deserves your attention next.”</p><small>— THE TIMEPLANNER APPROACH</small></aside>
      </section>
      <section className="about-sections">
        <div><div className="eyebrow">The thinking</div><h2>Useful beats impressive.</h2></div>
        <div>
          <p className="about-copy">Your tasks have a title, a little context, and a clear place in time. That is enough to make a busy day feel less abstract. Add plans as they come to you, filter by the kind of work you are doing, and edit details without losing your place.</p>
          <div className="principles">{principles.map(([title, text]) => <article className="principle" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="hero-actions"><Link to="/tasks" className="button button-orange">Make a plan <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>
    </div>
  );
}