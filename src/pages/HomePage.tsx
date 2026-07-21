import Navbar from "../components/layout/Navbar/Navbar";
import Hero from "../components/layout/Hero/Hero";
import GeneratorPanel from "../features/generator/GeneratorPanel";

function HomePage() {
  return (
    <div>
      <div id="top"></div>
      <Navbar />
      <main>
        <Hero />
        <GeneratorPanel />
      </main>
    </div>
  );
}

export default HomePage;