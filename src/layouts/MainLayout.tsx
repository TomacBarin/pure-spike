import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";

function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />
        <main>
            <Outlet />
        </main>
      <Footer />
    </div>
  );
}

export default MainLayout;