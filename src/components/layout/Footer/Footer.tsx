import styles from "./Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {currentYear} Pure Spike Studio
        </p>
        <p className={styles.tagline}>
          Generate pristine impulse responses for your DAW
        </p>
      </div>
    </footer>
  );
}

export default Footer;