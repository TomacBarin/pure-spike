import Navbar from "../components/layout/Navbar/Navbar";
import Hero from "../components/layout/Hero/Hero";

function HomePage() {
  return (
    <div>
      <div id="top"></div>
      <Navbar />
      <main>
        <Hero />

        {/* Placeholder för Generator – vi bygger den senare */}
        <section id="generator" style={{ minHeight: "400px", padding: "4rem 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
            <h2>Impulse Generator (coming soon)</h2>
            <p>This is where the generator will be placed.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;