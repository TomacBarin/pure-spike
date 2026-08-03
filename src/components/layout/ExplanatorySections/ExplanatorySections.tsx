import { useState } from 'react';
import { Card } from '../../ui/Card/Card';
import { Button } from '../../ui/Button/Button';
import styles from './ExplanatorySections.module.css';

function ExplanatorySections() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.section} aria-label="Learn more about Pure Spike Studio">
      <div className={styles.container}>
        {/* Toggle button */}
        <div className={styles.toggleWrapper}>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
          >
            {isOpen ? 'Learn less' : 'Learn more'}
          </Button>
        </div>

        {/* Collapsible content */}
        <div
          className={`${styles.collapse} ${isOpen ? styles.open : ''}`}
          aria-hidden={!isOpen}
        >
          <div className={styles.collapseInner}>
            <div className={styles.grid}>
              <Card title="What is Pure Spike Studio?" padding="md" className={styles.infoCard}>
                <p>
                  Pure Spike Studio lets you instantly generate high-quality impulse responses
                  for convolution reverbs and transient shaping. Built for music producers and
                  sound designers who want professional results without complicated setup.
                </p>
              </Card>

              <Card title="How to use it" padding="md" className={styles.infoCard}>
                <ol className={styles.steps}>
                  <li>Adjust the parameters in the generator.</li>
                  <li>Preview the waveform.</li>
                  <li>Export as high-quality 32-bit WAV.</li>
                  <li>(Optional) Create a free account to save your settings as presets.</li>
                </ol>
              </Card>

              <Card title="Guest vs Account" padding="md" className={styles.infoCard}>
                <ul className={styles.list}>
                  <li>
                    <strong>Guest</strong> — Full access to the generator. Generate and export
                    impulses instantly. No signup required.
                  </li>
                  <li>
                    <strong>Free Account</strong> — Save, organize, reload, and export your
                    presets. All your impulses in one place.
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExplanatorySections;