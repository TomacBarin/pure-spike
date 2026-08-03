import { useState } from 'react';
import styles from './ExplanatorySections.module.css';

const SLIDES = [
  {
    id: 'about',
    title: 'About Pure Spike Studio',
    body: (
      <p>
        Pure Spike Studio lets you instantly generate high-quality impulse
        responses for convolution reverbs and transient shaping. Built for
        music producers and sound designers who want professional results
        without complicated setup.
      </p>
    ),
  },
  {
    id: 'how',
    title: 'How to use it',
    body: (
      <ol className={styles.steps}>
        <li>Adjust the parameters in the generator.</li>
        <li>Preview the waveform.</li>
        <li>Export as high-quality 32-bit WAV.</li>
        <li>
          (Optional) Create a free account to save your settings as presets.
        </li>
      </ol>
    ),
  },
  {
    id: 'guest',
    title: 'Guest vs Account',
    body: (
      <ul className={styles.list}>
        <li>
          <strong>Guest</strong> — Full access to the generator. Generate and
          export impulses instantly. No signup required.
        </li>
        <li>
          <strong>Free Account</strong> — Save, organize, reload, and export
          your presets. All your impulses in one place.
        </li>
      </ul>
    ),
  },
] as const;

function ExplanatorySections() {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const current = SLIDES[index];

  const goNext = () => {
    setIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const goTo = (i: number) => {
    setIndex(i);
  };

  return (
    <section className={styles.section} aria-label="About Pure Spike Studio">
      <div className={styles.container}>
        <article className={styles.card}>
          <div className={styles.header}>
            <button
              type="button"
              className={styles.titleButton}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
            >
              {current.title}
            </button>
          </div>

          <div className={`${styles.body} ${isOpen ? styles.open : ''}`}>
            <div className={styles.bodyInner}>{current.body}</div>
          </div>
        </article>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={goPrev}
            aria-label="Previous topic"
          >
            ‹
          </button>

          <div className={styles.dots} role="tablist" aria-label="Topics">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={slide.title}
                className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.arrowButton}
            onClick={goNext}
            aria-label="Next topic"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export default ExplanatorySections;