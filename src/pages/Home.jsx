import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Modal from "../components/Modal";
import { RocketPath } from "../components/Graphics/RocketPath";
import { Rocket } from "../components/Graphics/Rocket";
import Planet from "../components/Graphics/Planet";
import IconMail from "../components/Icons/IconMail";
import IconGithub from "../components/Icons/IconGithub";
import IconLinkedin from "../components/Icons/IconLinkedin";

import "./Home.scss";
import Form from "../components/Form";

const SECTIONS = ["section01", "section02", "section03", "section04"];
const CAREERSECTION = "section03";

function Home() {
  const [activeSection, setActiveSection] = useState("section01");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const pathRef = useRef(null);

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

  // 로켓 스크롤 애니메이션
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(MotionPathPlugin);

  useGSAP(() => {
    if (pathRef.current) {
      gsap.to(".rocket", {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          autoRotate: -80,
          alignOrigin: [0.5, 0.5],
        },
        scrollTrigger: {
          trigger: ".section03",
          start: "top 10%",
          end: "bottom 90%",
          scrub: true,
          onUpdate: (self) => {
            gsap.to(".rocket-inner", {
              rotate: () => (self.direction === -1 ? 0 : 180),
              duration: 0.15,
              transformOrigin: "center center",
            });
          },
          ease: "none",
          duration: 10,
          immediateRender: true,
          markers: true,
        },
      });
    }
  }, [pathRef]);

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
      <div className="stars-large"></div>
      {/* section01: introduction */}
      <section className="section section01">
        <div className="inner">
          <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
            tenetur odio placeat laborum accusantium voluptatibus harum eveniet
            dignissimos blanditiis modi reprehenderit inventore possimus, ipsa
            cupiditate est, quidem corporis molestias! Nemo! Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Dolores laudantium cumque
            atque possimus voluptatem officiis, animi nobis assumenda error
            autem quo eveniet ut eos ad sit, culpa, placeat blanditiis!
            Mollitia.
          </p>
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
          <div className="rocket-wrap">
            <RocketPath pathRef={pathRef} className="rocket-path" />
            <Rocket className="rocket" />
          </div>
          <div className="career-wrap">
            <div className="career career01">
              <Planet type={"earth"} />
              <div className="career-info">
                <div className="period">period</div>
                <div className="company">
                  name
                  <span className="role">role</span>
                </div>
                <div className="description">
                  <ul className="description-list">
                    <li>description 01</li>
                    <li>description 02</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="career career02">
              <Planet type={"mars"} />
              <div className="career-info">
                <div className="period">period</div>
                <div className="company">
                  name
                  <span className="role">role</span>
                </div>
                <div className="description">
                  <ul className="description-list">
                    <li>description 01</li>
                    <li>description 02</li>
                    <li>description 03</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="career career03">
              <Planet type={"saturn"} />
              <div className="career-info">
                <div className="period">period</div>
                <div className="company">
                  name
                  <span className="role">role</span>
                </div>
                <div className="description">
                  <ul className="description-list">
                    <li>description 01</li>
                    <li>description 02</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="career career04">
              <Planet type={"sun"} />
              <div className="career-info">
                <div className="period">period</div>
                <div className="company">
                  name
                  <span className="role">role</span>
                </div>
                <div className="description">
                  <ul className="description-list">
                    <li>description 01</li>
                    <li>description 02</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="career career05">
              <Planet type={"moon"} />
              <div className="career-info">
                <div className="period">period</div>
                <div className="company">name</div>
                <div className="role">role</div>
              </div>
            </div>

            <div className="career career06">
              <Planet type={"neptune"} />
              <div className="career-info">
                <div className="period">period</div>
                <div className="company">name</div>
                <div className="role">role</div>
              </div>
            </div>
          </div>
          {/* <div className="education-section">
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
            <Form />
            <div className="contact-sns">
              <div className="sns sns-github">
                <Link
                  to="https://github.com/strawberrylounge"
                  target="_blank"
                  className="sns-link"
                >
                  <IconGithub size={24} />
                  <span className="sr-only">Github</span>
                </Link>
              </div>
              <div className="sns sns-linkedin">
                <Link
                  to="https://www.linkedin.com/in/blueberrylounge"
                  target="_blank"
                  className="sns-link"
                >
                  <IconLinkedin size={24} />
                  <span className="sr-only">Linkedin</span>
                </Link>
              </div>
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
