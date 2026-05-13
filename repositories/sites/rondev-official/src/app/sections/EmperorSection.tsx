import { EMPEROR_FEATURES } from '@config/siteContent.config';



export function EmperorSection() {
  return (
    <section className="emperor-section" id="standard" aria-labelledby="emperor-heading">
      <div>
        <div className="section-label" aria-hidden="true">
          Service Standard
        </div>

        <h2 id="emperor-heading" className="sr-only">
          Service Standard
        </h2>

        <p className="emperor-title" aria-label="Less waiting. Less manual work. More clarity.">
          Less<br />
          <span style={{ color: "#c8f542" }}>Waiting.</span>
          <br />
          <span
            aria-hidden="true"
            style={{
              color: "rgba(232,228,220,0.15)",
              WebkitTextStroke: "1px rgba(232,228,220,0.15)",
            }}
          >
            Less
          </span>
          <br />
          <span
            aria-hidden="true"
            style={{
              color: "rgba(232,228,220,0.15)",
              WebkitTextStroke: "1px rgba(232,228,220,0.15)",
            }}
          >
            Manual Work.
          </span>
        </p>

        <p className="emperor-subtitle">
          We build practical online systems that reduce queues, reduce follow-ups,
          and make processing easier for staff—so service becomes faster and more transparent.
        </p>
      </div>

      <div className="emperor-features">
        {EMPEROR_FEATURES.map((f) => (
          <div key={f.num} className="emperor-feature">
            <span className="feature-num" aria-hidden="true">
              {f.num}
            </span>
            <div className="feature-content">
              <h3 className="feature-title">{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
