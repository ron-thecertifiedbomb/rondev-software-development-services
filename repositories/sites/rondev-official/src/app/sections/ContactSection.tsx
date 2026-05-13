import { SERVICES } from "@config/siteContent.config";
import { useContactForm } from "../hooks/useContactForm";

interface ContactSectionProps {
  setCursorHover: (v: boolean) => void;
}

export function ContactSection({ setCursorHover }: ContactSectionProps) {
  const { formData, formStatus, setFormData, handleSubmit } = useContactForm();
  const DEMO_URL = "https://smart-barangay-demo.vercel.app/";
  const field = <K extends keyof typeof formData>(key: K) => ({
    value: formData[key],
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setFormData((prev) => ({ ...prev, [key]: e.target.value })),
  });

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      {/* Left column */}
      <div>
        <div className="section-label" aria-hidden="true">Get in Touch</div>

        <h2 id="contact-heading" className="contact-title">
          Request a<br />
          <span style={{ color: "#c8f542" }}>Live Demo</span><br />
          in Minutes.
        </h2>

        <p className="contact-sub">
          Based in San Jose del Monte, Bulacan. We reply within 24 hours.
          Prototype demo is typically ready in 10–14 days.
        </p>

        {/* Optional: fast contact shortcuts (recommended for business owners) */}
        {/* <div className="contact-links" aria-label="Quick contact links">
        
          <div className="contact-links" aria-label="Quick links">
            <a href={DEMO_URL} className="contact-link" target="_blank" rel="noopener noreferrer">
              <span className="contact-link-icon" aria-hidden="true">🧪</span>
              View Live Demo
            </a>

            <a href="mailto:office@rondev.com.ph" className="contact-link">
              <span className="contact-link-icon" aria-hidden="true">✉</span>
              office@rondev.com.ph
            </a>
          </div>

        </div> */}
      </div>

      {/* Right column — form */}
      <div>
        {formStatus === "success" ? (
          <div className="form-success" role="status" aria-live="polite">
            ✓ Message received. We’ll reply within 24 hours.
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Name</label>
                <input
                  id="contact-name"
                  className="form-input"
                  type="text"
                  placeholder="Juan Dela Cruz"
                  autoComplete="name"
                  required
                  {...field("name")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email</label>
                <input
                  id="contact-email"
                  className="form-input"
                  type="email"
                  placeholder="juan@company.com"
                  autoComplete="email"
                  required
                  {...field("email")}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-service" className="form-label">What do you need?</label>
              <select
                id="contact-service"
                className="form-select"
                required
                {...field("service")}
              >
                <option value="">Select a service...</option>
                {SERVICES.map((s) => (
                  <option key={s.code} value={s.title}>
                    {s.title}
                  </option>
                ))}
                {/* Optional extra option for demo conversion */}
                <option value="Live Demo (Smart Barangay Portal)">Live Demo (Smart Barangay Portal)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">Short details</label>
              <textarea
                id="contact-message"
                className="form-textarea"
                placeholder={
                  "Example:\n• Organization: Barangay / Business name\n• Need: Online requests + tracking / admin dashboard\n• Target timeline: (date)\n• Contact number (optional)"
                }
                required
                {...field("message")}
              />
            </div>

            {formStatus === "error" && (
              <div className="form-error" role="alert" aria-live="assertive">
                Something went wrong. Please try again or email us directly at office@rondev.com.ph
              </div>
            )}

            <button
              className="btn-submit"
              type="submit"
              aria-busy={formStatus === "sending"}
              disabled={formStatus === "sending"}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              {formStatus === "sending" ? "Sending..." : "Request a Demo →"}
            </button>

            {/* Optional micro-trust line */}
              <p style={{ marginTop: "0.75rem", fontSize: "0.7rem", color: "#e8e4dc" }}>
              Tip: If you want, include your preferred meeting time and we’ll schedule a quick demo call.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
