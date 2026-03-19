import AboutMe from "./components/AboutMe/AboutMe";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import MyThinking from "./components/MyThinking/MyThinking";
import Projects from "./components/Projects/Projects";

function App() {
  return (
    <div>
      {/* <Logo /> */}
      <Hero />
      <MyThinking />
      <AboutMe />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
