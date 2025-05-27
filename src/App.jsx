import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import BtnTop from "./components/Buttons/BtnTop.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About/About.jsx";
import Work from "./pages/Works/Works.jsx";

function App() {
  return (
    <Router>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Work" element={<Work />} />
        </Routes>
      </main>
      <BtnTop />
    </Router>
  );
}

export default App;
