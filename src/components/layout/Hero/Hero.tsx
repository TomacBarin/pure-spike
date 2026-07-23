import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <h1 id="hero-heading" className={styles.headline}>
          Generate pristine impulse responses for your DAW
        </h1>

        <p className={styles.subheadline}>
          Free to use as a guest. Create a free account to save and manage your
          presets.
        </p>
      </div>
    </section>
  );
}

export default Hero;