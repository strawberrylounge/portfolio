import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import BtnTop from "./components/Buttons/BtnTop.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About/About.jsx";
import Work from "./pages/Works/Works.jsx";

function App() {
  // app.jsx 또는 최상위 컴포넌트
  useEffect(() => {
    // 여러 시점에서 스크롤 위치 강제 초기화
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // 즉시 실행
    resetScroll();

    // 브라우저의 스크롤 복원 비활성화
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // 페이지가 완전히 로드된 후 한번 더
    const handleLoad = () => {
      resetScroll();
    };

    // DOMContentLoaded와 load 이벤트 모두 처리
    document.addEventListener("DOMContentLoaded", resetScroll);
    window.addEventListener("load", handleLoad);

    // 페이지가 보여질 때도 처리 (뒤로가기 등)
    const handlePageShow = (event) => {
      if (event.persisted) {
        // 캐시에서 복원된 경우
        resetScroll();
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("DOMContentLoaded", resetScroll);
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

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
