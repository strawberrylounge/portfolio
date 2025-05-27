import { useEffect, useState } from "react";

import "./Home.scss";

function Home() {
  const [activeSection, setActiveSection] = useState("section01");

  // Scroll highjacking
  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e) => {
      if (isScrolling) return;

      e.preventDefault();
      isScrolling = true;

      const currentIndex = ["section01", "section02", "section03"].indexOf(
        activeSection
      );
      let nextIndex;

      if (e.deltaY > 0 && currentIndex < 2) {
        nextIndex = currentIndex + 1;
      } else if (e.deltaY < 0 && currentIndex > 0) {
        nextIndex = currentIndex - 1;
      }

      if (nextIndex !== undefined) {
        const nextSection = ["section01", "section02", "section03"][nextIndex];
        scrollToSection(nextSection);
        setActiveSection(nextSection);
      }

      setTimeout(() => {
        isScrolling = false;
      }, 1000); // 1초 쿨타임
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [activeSection]);

  // Navigation 클릭 시 스크롤
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          setActiveSection(section.classList[1]);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(`.${sectionId}`);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="wrap">
      {/* section01: introduction */}
      <section className="section section01">
        <div className="inner">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
          tenetur odio placeat laborum accusantium voluptatibus harum eveniet
          dignissimos blanditiis modi reprehenderit inventore possimus, ipsa
          cupiditate est, quidem corporis molestias! Nemo!
        </div>
      </section>
      {/* section02: works */}
      <section className="section section02">
        <div className="inner">
          <div className="works">
            <div className="work work01">test1</div>
            <div className="work work02">test2</div>
            <div className="work work03">test3</div>
          </div>
        </div>
      </section>
      {/* section03: career */}
      <section className="section section03"></section>
      {/* section04: contact */}
      <section className="section section04">Contact</section>
    </div>
  );
}

export default Home;
