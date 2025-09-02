import { useEffect, useState } from "react";

import Modal from "../components/Modal";
import { RocketPath } from "../components/graphics/RocketPath";
import { Rocket } from "../components/graphics/Rocket";

import "./Home.scss";

const SECTIONS = ["section01", "section02", "section03", "section04"];

function Home() {
  const [activeSection, setActiveSection] = useState("section01");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  /*
  // Wheel 이벤트 활성화
  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e) => {
      if (isScrolling) return;

      e.preventDefault();
      isScrolling = true;

      const currentIndex = SECTIONS.indexOf(activeSection);
      let nextIndex;

      if (e.deltaY > 0 && currentIndex < SECTIONS.length - 1) {
        nextIndex = currentIndex + 1;
      } else if (e.deltaY < 0 && currentIndex > 0) {
        nextIndex = currentIndex - 1;
      }

      if (nextIndex !== undefined) {
        const nextSection = SECTIONS[nextIndex];
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
  */

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

  /*
  // Wheel 이벤트를 위한 section 활성화
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(`.${sectionId}`);
    element?.scrollIntoView({ behavior: "smooth" });
  };
  */

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
    title: "Title",
    company: "우리집",
    period: "2023.01.01 ~ 2023.03.01",
    role: "Frontend Developer",
    techStack: ["React", "JavaScript", "HTML", "CSS"], // Array
    summary: "요약입니다.",
  };

  return (
    <div className="wrap">
      {/* <div className="stars"></div> */}
      {/* section01: introduction */}
      <section className="section section01">
        <div className="start-large"></div>
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
      <section className="section section03">
        <div className="inner">
          <RocketPath className="path" />
          <Rocket className="rocket" />
          {/* <div className="career-timeline">
            <ul className="career career01">
              <li className="period">2024.05 ~ 현재</li>
              <li className="company">금성출판사</li>
              <li className="role">프론트엔드 개발자</li>
              <li className="description">
                <ul className="description-list">
                  <li>자사 사이트 유지보수 및 신규 개발</li>
                  <li>퍼블리싱 및 프론트엔드 개발 전담</li>
                </ul>
              </li>
            </ul>

            <ul className="career career02">
              <li className="period">2021.12 ~ 2022.09</li>
              <li className="company">올리브유니온</li>
              <li className="role">프론트엔드 개발자</li>
              <li className="description">
                <ul className="description-list">
                  <li>CMS UI 개발 및 프론트엔드 개발</li>
                  <li>SMS/이메일 인증 등 API 개발</li>
                  <li>AWS Amplify, S3 호스팅 관리</li>
                </ul>
              </li>
            </ul>

            <ul className="career career03">
              <li className="period">2020.02 ~ 2021.05</li>
              <li className="company">어썸코드</li>
              <li className="role">선임 퍼블리셔</li>
              <li className="description">
                <ul className="description-list">
                  <li>퍼블리싱 팀 선임, 팀장 대행 역할</li>
                  <li>
                    스포츠알마냑(2021.1 오픈) 등 SPA 기반의 신규 프로젝트 UI
                    개발
                  </li>
                </ul>
              </li>
            </ul>

            <ul className="career career04">
              <li className="period">2019.04 ~ 2019.12</li>
              <li className="company">지엠솔루션 (LG CNS 파견)</li>
              <li className="role">퍼블리셔</li>
              <li className="description">
                <ul className="description-list">
                  <li>LG.com 글로벌 마이크로사이트 퍼블리싱</li>
                  <li>대규모 사이트 유지보수 경험</li>
                </ul>
              </li>
            </ul>

            <div className="career-item career-item--collapsed">
              <div className="period">2018.03 ~ 2018.09</div>
              <div className="company">투게더앱스</div>
              <div className="role">웹디자이너</div>
            </div>

            <div className="career-item career-item--collapsed">
              <div className="period">2016.08 ~ 2017.10</div>
              <div className="company">아이포터</div>
              <div className="role">웹디자이너</div>
            </div>
          </div>
          <div className="education-section">
            <h3>주요 교육</h3>
            <div className="education-item">
              <span className="period">2021.06 ~ 12</span>
              <span className="course">스마트웹앱 풀스택 개발 과정</span>
              <span className="institute">한국소프트웨어인재개발원</span>
            </div>
          </div> */}
        </div>
      </section>
      {/* section04: contact */}
      <section className="section section04">
        <div className="inner">
          <h2>Contact</h2>
          <div className="contact">
            <div className="contact-method">
              {/* <IconEmail /> */}
              <span>email</span>
              <span>raspberrylounge@gmail.com</span>
            </div>
            <div className="contact-method">
              {/* <IconGithub /> */}
              <span>github</span>
              <span>github.com/strawberrylounge</span>
            </div>
            <div className="contact-method">
              {/* <IconLinkedin /> */}
              <span>linkedin</span>
              <span>www.linkedin.com/in/blueberrylounge</span>
            </div>
          </div>
        </div>
      </section>

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
