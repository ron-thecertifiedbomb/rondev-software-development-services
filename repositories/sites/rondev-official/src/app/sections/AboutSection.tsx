
export interface DetailItem {
  key: string;
  val: string;
  accent?: boolean;
}

export const ABOUT_DETAILS: DetailItem[] = [
  { key: "Principal Consultant", val: "Ronan Ramos Sibunga" },
  { key: "DTI Registration", val: "BN 8153271" },
  { key: "Based In", val: "San Jose del Monte, Bulacan" },
  { key: "Coverage", val: "Bulacan & nearby areas" },
  { key: "Focus", val: "Online portals, tracking, and admin dashboards" },
  { key: "Typical Timeline", val: "Prototype: 10–14 days • Go‑Live: 3–4 weeks" },
  { key: "Official Domain", val: "rondev.com.ph", accent: true },
] as const;

export function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div>
        <div className="section-label" style={{ marginBottom: '2rem' }}>About RONDEV</div>
        <h2 className="about-title">
          Built for<br />
          <span style={{ color: '#c8f542' }}>Bulacan.</span><br />
          Built to<br />
          Last.
        </h2>
      </div>

      <div className="about-content">
        <p className="about-text">
          As a local entity headquartered in San Jose del Monte, RONDEV is dedicated to the
          technological advancement of Bulacan. We provide the technical backbone that allows
          local businesses to compete at a national level.
        </p>
        <p className="about-text">
          Our Principal Consultant, Ronan Ramos Sibunga, leads every engagement with a
          commitment to zero-friction delivery — from initial architecture to production deployment.
        </p>

        <div className="about-detail">
          {ABOUT_DETAILS.map((d) => (
            <div key={d.key} className="detail-row">
              <span className="detail-key">{d.key}</span>
              <span className={`detail-val ${d.accent ? 'accent' : ''}`}>{d.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
