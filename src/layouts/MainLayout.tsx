import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import AmbientBackground from '../components/layout/AmbientBackground/AmbientBackground';

function MainLayout() {
  return (
    <div
      className="app-shell"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Navbar />

      <main style={{ flex: 1, position: 'relative' }}>
        <AmbientBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;