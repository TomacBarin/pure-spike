import Navbar from "../components/layout/Navbar/Navbar";
import Hero from "../components/layout/Hero/Hero";
import GeneratorPanel from "../features/generator/GeneratorPanel";
import ExplanatorySections from "../components/layout/ExplanatorySections/ExplanatorySections";

function HomePage() {
  return (
    <div>
      <div id="top"></div>
      <Navbar />
      <main>
        <Hero />
        <GeneratorPanel />
        <ExplanatorySections />
      </main>
    </div>
  );
}

export default HomePage;