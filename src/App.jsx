import "./App.css";
import Sky from "./components/Sky.jsx";
import Nav from "./components/Nav.jsx";
import Slider from "./components/Slider.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="app">
      <Sky />
      <Nav />
      <main className="main">
        <Slider />
      </main>
      <Footer />
    </div>
  );
}
