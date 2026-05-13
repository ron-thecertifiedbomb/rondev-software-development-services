interface CtaSectionProps {
  setCursorHover: (v: boolean) => void;
}

const DEMO_LINKS = [
  {
    label: "Smart Barangay (Live Demo)",
    href: "https://smart-barangay-demo-git-demo-public-h-3dc9ad-lizard-interactive.vercel.app/",
  },
  {
    label: "Business Tracking Demo",
    href: "https://sjdm-business-tracking-demo.vercel.app/",
  },
  {
    label: "Product Landing (iPhone PH)",
    href: "https://iphone-philippines-3dlanding-page.vercel.app/",
  },
  {
    label: "Product Landing (Branding)",
    href: "https://branding-landing-page.vercel.app/",
  },
  {
    label: "Personal Landing Page",
    href: "https://ronansibunga.vercel.app/",
  },
] as const;

export function CtaSection({ setCursorHover }: CtaSectionProps) {
  const cursorHandlers = {
    onMouseEnter: () => setCursorHover(true),
    onMouseLeave: () => setCursorHover(false),
  };

  return (
    <section className="cta-section" id="viewdemos">
      <div className="cta-bg" />


      <h2 className="cta-title">
        Choose a<br />
        <span style={{ color: "#c8f542" }}>Live Demo.</span>
      </h2>

      {/* <p className="cta-sub">
        Pick a portal to try. Copy a tracking code. Check status in seconds.
      </p> */}


      {/* <div className="cta-primary-row">
        <a href="#contact" className="btn-primary" {...cursorHandlers}>
          Request a Demo
        </a>
      </div> */}

      {/* ✅ ONE primary CTA + demo links */}
      <div className="cta-buttons">
 

        {DEMO_LINKS.map((d) => (
          <a
            key={d.href}
            href={d.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            {...cursorHandlers}
          >
            {d.label}
          </a>
        ))}
      </div>

      <p className="cta-sub" style={{ marginTop: "1.25rem" }}>
        Based in SJDM • Reply within 24 hours • Prototype demo in 10–14 days
      </p>
    </section>
  );
}