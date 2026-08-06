import { Button } from '../../ui/Button/Button';
import { useAuth } from '../../../providers/AuthProvider';
import { useAuthModal } from '../../../features/auth/AuthModalContext';
import styles from './Hero.module.css';

function Hero() {
  const { isAuthenticated } = useAuth();
  const { openRegister } = useAuthModal();

  const handleStartGenerating = () => {
    const generatorSection = document.getElementById('generator');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <h1 id="hero-heading" className={styles.headline}>
          Generate pure, pristine impulse responses for sound design
        </h1>

        <p className={styles.subheadline}>
          {isAuthenticated
            ? 'You are logged in. Save and manage your presets from the generator.'
            : 'Free to use as a guest. Create a free account to save and manage your presets.'}
        </p>

        <div className={styles.cta}>
          <Button variant="primary" size="sm" onClick={handleStartGenerating}>
            Start generating
          </Button>

          {!isAuthenticated && (
            <Button variant="secondary" size="sm" onClick={openRegister}>
              Create free account
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;