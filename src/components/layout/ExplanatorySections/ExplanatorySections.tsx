import { Card } from "../../ui/Card/Card";
import styles from "./ExplanatorySections.module.css";

function ExplanatorySections() {
  return (
    <section className={styles.section} aria-labelledby="explanatory-heading">
      <div className={styles.container}>
        <h2 id="explanatory-heading" className={styles.heading}>
          About Pure Spike Studio
        </h2>

        <div className={styles.grid}>
          {/* Card 1 */}
          <Card title="What is Pure Spike Studio?" padding="md">
            <p>
              Pure Spike Studio lets you instantly generate high-quality impulse
              responses (IRs) for use in convolution reverbs and transient
              shaping tools in your DAW. Choose between clean Pure Spike
              impulses or configurable Noise Bursts.
            </p>
          </Card>

          {/* Card 2 */}
          <Card title="Who is it for?" padding="md">
            <p>
              Music producers and sound designers who need fast,
              professional-grade impulse responses without complicated setup.
              Perfect for convolution reverbs and transient shaping in DAWs and
              plugins such as Ableton Live and Xfer Serum 2.
            </p>
          </Card>

          {/* Card 3 */}
          <Card title="How to use it" padding="md">
            <ol className={styles.steps}>
              <li>Adjust the parameters in the generator.</li>
              <li>Preview the waveform.</li>
              <li>Export as high-quality 32-bit WAV.</li>
              <li>
                (Optional) Create a free account to save your settings as
                presets.
              </li>
            </ol>
          </Card>

          {/* Card 4 */}
          <Card title="Guest vs Account" padding="md">
            <ul className={styles.list}>
              <li>
                <strong>Guest</strong> — Full access to the generator. Generate
                and export impulses instantly. No signup required.
              </li>
              <li>
                <strong>Free Account</strong> — Save, organize, reload, and
                export your presets. All your impulses in one place.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ExplanatorySections;