import { Button } from "../../ui/Button/Button";
import styles from "./Hero.module.css";

function Hero() {
  const handleStartGenerating = () => {
    const generatorSection = document.getElementById("generator");
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCreateAccount = () => {
    // Placeholder – to be replaced with register-flow 
    alert("Create free account – coming soon");
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <h1 id="hero-heading" className={styles.headline}>
          Generate pure, pristine impulse responses for sound design
        </h1>

        <p className={styles.subheadline}>
          Free to use as a guest. Create a free account to save and manage your
          presets.
        </p>

        <div className={styles.cta}>
          <Button variant="primary" size="sm" onClick={handleStartGenerating}>
            Start generating
          </Button>
          <Button variant="secondary" size="sm" onClick={handleCreateAccount}>
            Create free account
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;