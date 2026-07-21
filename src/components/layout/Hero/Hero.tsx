import { Button } from "../../ui/Button/Button";
import styles from "./Hero.module.css";

function Hero() {
  const handleStartGenerating = () => {
    // Smooth scroll for the generator (id="generator" will be added later)
    const generatorSection = document.getElementById("generator");
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <h1 id="hero-heading" className={styles.headline}>
          Pure Spike Studio
        </h1>

        <p className={styles.subheadline}>
          Generate pristine impulse responses for convolution reverbs and
          transient shaping in your DAW.
        </p>

        <p className={styles.supportingText}>
          Free to use as a guest. Create a free account to save and manage your
          presets.
        </p>

        <div className={styles.cta}>
          <Button variant="primary" size="lg" onClick={handleStartGenerating}>
            Start Generating
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;