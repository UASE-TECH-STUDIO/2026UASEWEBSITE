const steps: [string, string][] = [
  ["Planning", "Turn the client's problem into scope, roles, priorities and a delivery plan."],
  ["Architecture", "Design the system: Next.js frontend, FastAPI backend, MongoDB Atlas, role-based access, real-time layer."],
  ["Design", "Brand-consistent UI and UX for web and mobile, including safe-area and device handling."],
  ["Technology choices", "Safe, robust, scalable and economical: a minimal stack that stays cheap to run and easy to grow."],
  ["Building", "Write and compile the frontend, backend and native iOS/Android shells with Capacitor."],
  ["Debugging", "Find and fix errors across web, backend, iOS builds and Android builds."],
  ["Testing", "Test every role and flow on real devices and browsers before release."],
  ["Launch", "Host on the web, then ship to Google Play and the Apple App Store."],
  ["Team walkthrough", "Present and test with the client's team so they can run it day to day."],
  ["Continuous upgrades", "Keep adding features that solve modern problems and make the app easier to use."],
];
export default function Process({ title = "How I deliver: idea to App Store" }: { title?: string }) {
  return (
    <section>
      <h2>{title}</h2>
      <p className="sub">I handled every stage of CARSTRIMS myself, from the client&apos;s problem to the live product.</p>
      <div className="grid">
        {steps.map(([t, d], i) => (
          <div key={t} className="card"><span className="mono" style={{ color: "var(--gold)", fontSize: 13 }}>{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{d}</p></div>
        ))}
      </div>
    </section>
  );
}
