import { useEffect, useState } from 'react';
import { getCertifications } from '../api/portfolioApi.js';
import { defaultCertifications, resolveImage } from '../portfolio/defaultData.js';
import './Certifications.css';

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.2 14 6l4.2.7-3 3 0.7 4.2-3.9-2-3.8 2 .7-4.2-3-3L10 6l2-3.8Zm-4.4 12.4 2.3 1.2-1.1 5.2-2.1-2.1-2.9.4 1.9-4.4c.6.1 1.2 0 1.9-.3Zm8.8 0c.6.3 1.3.4 1.9.3l1.9 4.4-2.9-.4-2.1 2.1-1.1-5.2 2.3-1.2Z" />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 3h10v3h3v2.2c0 2.4-1.6 4.4-3.8 4.9A5.7 5.7 0 0 1 13 15.9V19h3v2H8v-2h3v-3.1a5.7 5.7 0 0 1-3.2-2.8A5 5 0 0 1 4 8.2V6h3V3Zm10 5v2.8A3 3 0 0 0 18 8.2V8h-1ZM6 8v.2a3 3 0 0 0 1 2.6V8H6Z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 2h2v3h6V2h2v3h3v16H4V5h3V2Zm11 8H6v9h12v-9ZM6 7v1h12V7H6Z" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.4 20 5v6.1c0 5-3.2 8.9-8 10.5-4.8-1.6-8-5.5-8-10.5V5l8-2.6Zm3.6 6.4-4.5 4.5-2-2-1.4 1.4 3.4 3.4L17 10.2l-1.4-1.4Z" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 5c5.4 0 8.8 5.4 9 5.7l.7 1.3-.7 1.3c-.2.3-3.6 5.7-9 5.7s-8.8-5.4-9-5.7L2.3 12l.7-1.3C3.2 10.4 6.6 5 12 5Zm0 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
  </svg>
);

const Certifications = () => {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [certificationsStatus, setCertificationsStatus] = useState('Loading certifications...');
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    let isMounted = true;

    getCertifications()
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setCertifications(data.length ? data : defaultCertifications);
        setCertificationsStatus('');
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setCertifications(defaultCertifications);
        setCertificationsStatus('Certifications API unavailable. Showing saved fallback content.');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const openCertificate = (certificate) => {
    setActiveCertificate(certificate);
    setZoom(100);
  };
  const latestCertificationYear =
    certifications.find((certificate) => certificate.date?.match(/\d{4}/))?.date.match(/\d{4}/)?.[0] || '2024';

  if (activeCertificate) {
    return (
      <section id="certifications" className="certifications-section certificate-preview-section">
        <div className="certificate-sidebar">
          <button className="certificate-back" type="button" onClick={() => setActiveCertificate(null)}>
            <span>←</span> Back to Certifications
          </button>

          <aside className="certificate-info-card">
            <div className="certificate-large-icon">
              <AwardIcon />
            </div>
            <span className="verified-badge">Verified ✓</span>
            <h2>{activeCertificate.title}</h2>
            <p className="issuer-chip">{activeCertificate.issuer}</p>

            <dl>
              <div><dt>Issued By</dt><dd>{activeCertificate.issuer}</dd></div>
              <div><dt>Issue Date</dt><dd>{activeCertificate.date}</dd></div>
              <div><dt>Course Duration</dt><dd>{activeCertificate.duration}</dd></div>
              <div><dt>Consolidated Score</dt><dd>{activeCertificate.score}</dd></div>
              <div><dt>Roll Number</dt><dd>{activeCertificate.roll}</dd></div>
              <div><dt>Credits Recommended</dt><dd>{activeCertificate.credits}</dd></div>
            </dl>

            <a className="download-button" href={resolveImage(activeCertificate)} download>
              Download Certificate
            </a>
          </aside>

          <div className="authentic-card">
            <ShieldIcon />
            <p>This certificate is authentic and issued by {activeCertificate.issuer}.</p>
          </div>
        </div>

        <div className="certificate-preview-panel">
          <header className="preview-toolbar">
            <h3>Certificate Preview</h3>
            <div className="preview-actions">
              <button type="button" onClick={() => setZoom((value) => Math.max(70, value - 10))}>− Zoom Out</button>
              <span>{zoom}%</span>
              <button type="button" onClick={() => setZoom((value) => Math.min(130, value + 10))}>+ Zoom In</button>
              <a href={resolveImage(activeCertificate)} target="_blank" rel="noreferrer">Full Screen</a>
            </div>
          </header>

          <div className="certificate-image-stage">
            <img
              src={resolveImage(activeCertificate)}
              alt={`${activeCertificate.title} certificate`}
              style={{ width: `${zoom}%` }}
            />
          </div>

          <div className="preview-bottom-actions">
            <button type="button">Share</button>
            <a href={resolveImage(activeCertificate)} target="_blank" rel="noreferrer">Open in new tab</a>
            <a href={resolveImage(activeCertificate)} download>Download PDF</a>
            <button type="button">Verify Certificate</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="certifications-section scroll-reveal">
      <div className="certifications-heading">
        <div className="heading-icon"><AwardIcon /></div>
        <h2>Certifications & <span>Achievements</span></h2>
        <p>A collection of my professional certifications and achievements that validate my skills and knowledge.</p>
      </div>
      {certificationsStatus && <p className="portfolio-data-status">{certificationsStatus}</p>}

      <div className="cert-stats">
        <div><TrophyIcon /><strong>{certifications.length}+</strong><span>Certifications</span></div>
        <div><CalendarIcon /><strong>{latestCertificationYear}</strong><span>Latest Certification</span></div>
        <div><ShieldIcon /><strong>100%</strong><span>Verified Credentials</span></div>
      </div>

      <div className="cert-grid">
        {certifications.map((certificate) => (
          <article className="cert-card" key={certificate.title}>
            <div className="cert-image">
              <img src={resolveImage(certificate)} alt={`${certificate.title} certificate`} />
            </div>
            <div className="cert-content">
              <h3>{certificate.title}</h3>
              <div className="cert-meta">
                <span>{certificate.issuer}</span>
                <span>{certificate.date}</span>
              </div>
              <p>{certificate.description}</p>
              <div className="cert-score">
                <span>Score</span>
                <strong>{certificate.score}</strong>
              </div>
              <div className="cert-actions">
                <button type="button" onClick={() => openCertificate(certificate)}>
                  <EyeIcon /> View Certificate
                </button>
                <a href={resolveImage(certificate)} target="_blank" rel="noreferrer" aria-label={`Open ${certificate.title}`}>
                  ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="cert-footer">
        <AwardIcon /> Always learning, always growing. More achievements coming soon!
      </p>
    </section>
  );
};

export default Certifications;
