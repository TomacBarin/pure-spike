import { useState } from 'react';
import styles from './ExplanatorySections.module.css';

type CardId = 'what' | 'how' | 'guest';

function ExplanatorySections() {
  const [openId, setOpenId] = useState<CardId | null>(null);

  const toggle = (id: CardId) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={styles.section}
      aria-label="About Pure Spike Studio"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Card 1 */}
          <article className={styles.infoCard}>
            <button
              type="button"
              className={styles.cardHeader}
              onClick={() => toggle('what')}
              aria-expanded={openId === 'what'}
            >
              Pure Spike Studio
            </button>

            <div
              className={`${styles.cardBody} ${openId === 'what' ? styles.open : ''}`}
            >
              <div className={styles.cardBodyInner}>
                <p>
                  Pure Spike Studio lets you instantly generate high-quality
                  impulse responses for convolution reverbs and transient
                  shaping. Built for music producers and sound designers who
                  want professional results without complicated setup.
                </p>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className={styles.infoCard}>
            <button
              type="button"
              className={styles.cardHeader}
              onClick={() => toggle('how')}
              aria-expanded={openId === 'how'}
            >
              How to use it
            </button>

            <div
              className={`${styles.cardBody} ${openId === 'how' ? styles.open : ''}`}
            >
              <div className={styles.cardBodyInner}>
                <ol className={styles.steps}>
                  <li>Adjust the parameters in the generator.</li>
                  <li>Preview the waveform.</li>
                  <li>Export as high-quality 32-bit WAV.</li>
                  <li>
                    (Optional) Create a free account to save your settings as
                    presets.
                  </li>
                </ol>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className={styles.infoCard}>
            <button
              type="button"
              className={styles.cardHeader}
              onClick={() => toggle('guest')}
              aria-expanded={openId === 'guest'}
            >
              Guest vs Account
            </button>

            <div
              className={`${styles.cardBody} ${openId === 'guest' ? styles.open : ''}`}
            >
              <div className={styles.cardBodyInner}>
                <ul className={styles.list}>
                  <li>
                    <strong>Guest</strong> — Full access to the generator.
                    Generate and export impulses instantly. No signup required.
                  </li>
                  <li>
                    <strong>Free Account</strong> — Save, organize, reload, and
                    export your presets. All your impulses in one place.
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default ExplanatorySections;