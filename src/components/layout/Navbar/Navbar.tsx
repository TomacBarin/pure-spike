import { useState } from "react";
import { useTheme } from "../../../providers/ThemeProvider";
import { Button } from "../../ui/Button/Button";
import styles from "./Navbar.module.css";

function Navbar() {
    const { theme, toggleTheme } = useTheme();

    // Testing Guest versus Logged-ing user
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="#top" className={styles.logo}>
        Pure Spike Studio
        </a>
        
        {/* Navigation */}
        <div className={styles.navLinks}>
          <a href="#generator" className={styles.activeLink}>
            Generator
          </a>
        </div>

        {/* Right side */}
        <div className={styles.rightSide}>
          {/* Theme toggle */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>

          {/* Guest vs Logged-in */}
          {isLoggedIn ? (
            <div>Avatar dropdown (kommer snart)</div>
          ) : (
            <div className={styles.authButtons}>
              <Button variant="ghost" size="sm">Log in</Button>
              <Button variant="primary" size="sm">Register</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;