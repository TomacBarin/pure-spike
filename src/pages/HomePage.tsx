import Hero from "../components/layout/Hero/Hero";
import GeneratorPanel from "../features/generator/GeneratorPanel";
import ExplanatorySections from "../components/layout/ExplanatorySections/ExplanatorySections";

function HomePage() {
  return (
    <>
      <div id="top" />

      <Hero />
      <GeneratorPanel />
      <ExplanatorySections />
    </>
  );
}

export default HomePage;