import { Card } from "../../components/ui/Card/Card";
import { Button } from "../../components/ui/Button/Button";
import styles from "./GeneratorPanel.module.css";

function GeneratorPanel() {
  return (
    <section
      id="generator"
      className={styles.section}
      aria-labelledby="generator-heading"
    >
      <div className={styles.container}>
        <Card
          title="Impulse Generator"
          titleAs="h2"
          titleId="generator-heading"
          padding="lg"
          className={styles.panel}
        >
          <div className={styles.placeholderContent}>
            <p className={styles.message}>
              The full Impulse Generator will live here.
            </p>
            <p className={styles.subMessage}>
              Parameters, real-time waveform preview and WAV export are coming in the next phase.
            </p>

            {/* Temporary visual hint of future controls */}
            <div className={styles.fakeControls}>
              <Button variant="secondary" size="md" disabled>
                Pure Spike
              </Button>
              <Button variant="ghost" size="md" disabled>
                Noise Burst
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default GeneratorPanel;