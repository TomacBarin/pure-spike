import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

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