import { useState } from "react";
import { useTheme } from "../../../providers/ThemeProvider";
import { Button } from "../../ui/Button/Button";
import styles from "./Navbar.module.css";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  
  // Mock auth state – will be replaced
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    alert('You have been logged out (mock)');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="#top" className={styles.logo}>
          <img
            src="/icons/pssLogo_fixed.svg"
            alt=""
            className={styles.logoIcon}
            width={22}
            height={22}
          />

          <span className={styles.logoText}>
            <strong className={styles.logoBold}>Pure Spike</strong>
            <span className={styles.logoLight}> Studio</span>
          </span>
        </a>

        {/* Right side */}
        <div className={styles.rightSide}>
          {/* Theme toggle */}
          <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className={styles.themeToggle}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M105.08,-4.114L105.08,64.586C105.08,83.544 89.688,98.936 70.73,98.936L2.029,98.936C-16.929,98.936 -32.321,83.544 -32.321,64.586L-32.321,-4.114C-32.321,-23.072 -16.929,-38.464 2.029,-38.464L70.73,-38.464C89.688,-38.464 105.08,-23.072 105.08,-4.114Z"
                  transform="matrix(1.12048,0,0,1.12048,59.2376,66.1213)"
                  fill="currentColor"
                />
              </svg>
            </Button>

          {isLoggedIn ? (
            <div className={styles.avatarContainer}>
              <button
                className={styles.avatarButton}
                onClick={toggleDropdown}
                aria-label="Account menu"
                aria-expanded={showDropdown}
                aria-haspopup="true"
              >
                👤
              </button>
              
              {showDropdown && (
                <div className={styles.dropdown}>
                  <button onClick={() => alert('Account Settings – modal will be added later')}>
                    Account Settings
                  </button>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsLoggedIn(true)}
              >
                Log in
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => setIsLoggedIn(true)}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;