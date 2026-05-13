import { useState } from 'react';
import { SERVICES } from '../../../config/siteContent.config';


interface ServicesSectionProps {
  setCursorHover: (v: boolean) => void;
}

export function ServicesSection({ setCursorHover }: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleEnter = (i: number) => {
    setActiveIndex(i);
    setCursorHover(true);
  };

  const handleLeave = () => {
    setActiveIndex(null);
    setCursorHover(false);
  };

  return (
    <section className="section" id="services">
      <div className="section-label">Core Services</div>
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <div
            key={s.code}
            className={`service-card ${activeIndex === i ? 'active' : ''}`}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
          >
            {/* <span className="service-icon">{s.icon}</span>
            <div className="service-code">{s.code}</div> */}
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
            <span className="service-tag">{s.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
