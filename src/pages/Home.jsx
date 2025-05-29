import { useEffect, useState } from "react";

import Modal from "../components/Modal";

import "./Home.scss";

function Home() {
  const [activeSection, setActiveSection] = useState("section01");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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

  // Handle Project Modals
  const openModal = (projectData) => {
    setSelectedProject(projectData);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  // Project Modal Datas
  const projectData01 = {
    title: "Project Title",
    company: "Company Name",
    period: "2023.01.01 ~ 2023.03.01",
    role: "Frontend Developer",
    techStack: ["React", "JavaScript", "HTML", "CSS"], // Array
    summary: "test test test",
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
            <div
              className="work work01"
              onClick={() => openModal(projectData01)}
            >
              test1
            </div>
            <div className="work work02">test2</div>
            <div className="work work03">test3</div>
          </div>
        </div>
      </section>
      {/* section03: career */}
      <section className="section section03"></section>
      {/* section04: contact */}
      <section className="section section04">Contact</section>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        projectData={projectData01}
      >
        {/* 자유롭게 작성하는 상세 내용 */}
        <div className="project-details">
          <h3>🎯 주요 성과</h3>
          <ul>
            <li>페이지 로딩 속도 40% 개선</li>
            <li>사용자 만족도 90% 달성</li>
          </ul>

          <h3>🔧 해결한 문제</h3>
          <p>
            초기에 상태 관리가 복잡해서 렌더링 성능 이슈가 있었는데, Redux
            구조를 재설계하고 useMemo를 적절히 활용해서...
          </p>

          <h3>💡 배운 점</h3>
          <p>성능 최적화의 중요성을 깨달았고, 앞으로는...</p>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
