// StackSection.tsx
import { STACK } from '@config/siteContent.config';

export function StackSection() {
  return (
    // FIX 3: aria-labelledby ties the section to its heading
    <section className="section" id="stack" aria-labelledby="stack-heading">
      {/* FIX 3: sr-only h2 — visible label div stays for visual design */}
      <h2 id="stack-heading" className="sr-only">Technical Stack</h2>
      <div className="section-label" aria-hidden="true">Technical Stack</div>

      <div className="stack-grid">
        {STACK.map((col) => (
          <div key={col.label} className="stack-col">
            {/* FIX 3: h3 under h2 — correct descending order */}
            <h3 className="stack-label">{col.label}</h3>
            {col.items.map((item) => (
              <div key={item} className="stack-item">{item}</div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}


