import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About/About.jsx";
import Work from "./pages/Works/Works.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import BtnTop from "./components/Buttons/BtnTop.jsx";

function App() {
  return (
    <Router>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <BtnTop />
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
