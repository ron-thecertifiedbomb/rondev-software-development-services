

// TestimonialsSection.tsx
import { TESTIMONIALS } from '@config/siteContent.config';

export function TestimonialsSection() {
  return (
    <section className="section" id="testimonials" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading" className="sr-only">Client Stories</h2>
      <div className="section-label" aria-hidden="true">Client Stories</div>

      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          // FIX 3: Each card is an article — meaningful landmark for screen readers
          <article key={i} className="testimonial-card">
            <blockquote>
              <p className="testimonial-quote">{t.quote}</p>
            </blockquote>
            <footer className="testimonial-author">
              {/* FIX 2: Decorative avatar initials → aria-hidden */}
              <div className="author-avatar" aria-hidden="true">{t.initials}</div>
              <div>
                <cite className="author-name">{t.name}</cite>
                {/* FIX 2: author-role is often low-contrast — ensure slate-400+ */}
                <div className="author-role">{t.role}</div>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}