import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Modal from "../components/Modal";
import Form from "../components/Form";
import { RocketPath } from "../components/Graphics/RocketPath";
import { Rocket } from "../components/Graphics/Rocket";
import Planet from "../components/Graphics/Planet";
import IconGithub from "../components/Icons/IconGithub";
import IconLinkedin from "../components/Icons/IconLinkedin";
import IconMedium from "../components/Icons/IconMedium";

import "./Home.scss";

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
    window.scrollTo(0, 0);

    if (pathRef.current) {
      // career 요소들 초기 상태 설정
      gsap.set(".career", {
        opacity: 0,
        scale: 0.8,
        y: 30,
      });
      gsap.to(".rocket", {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          autoRotate: -80,
          alignOrigin: [0.5, 0.5],
        },
        scrollTrigger: {
          trigger: ".section03",
          start: "top 30%",
          end: "bottom 70%",
          scrub: true,
          // 새로고침 관련 이벤트 핸들러 추가
          onRefresh: (self) => {
            // ScrollTrigger가 새로고침될 때 스크롤 위치 재조정
            if (window.scrollY > 0) {
              window.scrollTo(0, 0);
            }
            // career 요소들도 초기 상태로 리셋
            gsap.set(".career", {
              opacity: 0,
              scale: 0.8,
              y: 30,
            });
          },
          onUpdate: (self) => {
            gsap.to(".rocket-inner", {
              rotate: () => (self.direction === -1 ? 0 : 180),
              duration: 0.15,
              transformOrigin: "center center",
            });

            // 진행률에 따라 career 요소들 순차 표시
            const progress = self.progress;
            const careerElements = document.querySelectorAll(".career");

            careerElements.forEach((career, index) => {
              // 더 일찍 나타나도록 계산 조정
              const showAt = (index / careerElements.length) * 0.7; // 70% 범위에서 완료

              if (progress >= showAt && career.style.opacity !== "1") {
                gsap.to(career, {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.3,
                  ease: "power2.out",
                  immediateRender: false, // 즉시 렌더링 방지
                  overwrite: true, // 중복 애니메이션 덮어쓰기
                });
              }
            });
          },
          ease: "none",
          duration: 10,
          immediateRender: false,
          refreshPriority: -1,
          markers: false,
        },
      });
    }
  }, [pathRef]);

  // 추가로 페이지 로드 완료 후에도 한 번 더 보장
  useEffect(() => {
    const handleLoad = () => {
      window.scrollTo(0, 0);
      // ScrollTrigger 새로고침
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

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
                <div className="period">2016.08 ~ 2017.10</div>
                <div className="company">아이포터</div>
                <span className="role">웹 디자이너</span>
              </div>
            </div>

            <div className="career career02">
              <Planet type={"moon"} />
              <div className="career-info">
                <div className="period">2018.03 ~ 2018.09</div>
                <div className="company">투게더앱스</div>
                <span className="role">웹 디자이너</span>
              </div>
            </div>

            <div className="career career03">
              <Planet type={"mars"} />
              <div className="career-info">
                <div className="period">2019.04 ~ 2019.12</div>
                <div className="company">
                  지엠솔루션<small>(LG CNS 파견)</small>
                </div>
                <span className="role">퍼블리셔</span>
                <div className="description">
                  <ul className="description-list">
                    <li>LG.com 글로벌 마이크로사이트 퍼블리싱</li>
                    <li>대규모 사이트 유지보수 경험</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="career career04">
              <Planet type={"saturn"} />
              <div className="career-info">
                <div className="period">2020.02 ~ 2021.05</div>
                <div className="company">어썸코드</div>
                <span className="role">선임 퍼블리셔</span>
                <div className="description">
                  <ul className="description-list">
                    <li>퍼블리싱 팀 선임, 팀장 대행 역할</li>
                    <li>
                      스포츠알마냑<small>(2021.1 오픈)</small> 등 SPA 기반의
                      신규 프로젝트 UI 개발
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="career career05">
              <Planet type={"neptune"} />
              <div className="career-info">
                <div className="period">2021.12 ~ 2022.09</div>
                <div className="company">올리브유니온</div>
                <span className="role">프론트엔드 개발자</span>
                <div className="description">
                  <ul className="description-list">
                    <li>CMS UI 개발 및 프론트엔드 개발</li>
                    <li>SMS/이메일 인증 등 API 개발</li>
                    <li>AWS Amplify, S3 호스팅 관리</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="career career06">
              <Planet type={"sun"} />
              <div className="career-info">
                <div className="period">2024.05 ~ 현재</div>
                <div className="company">금성출판사</div>
                <span className="role">프론트엔드 개발자</span>
                <div className="description">
                  <ul className="description-list">
                    <li>자사 사이트 유지보수 및 신규 개발</li>
                    <li>퍼블리싱 및 프론트엔드 개발 전담</li>
                  </ul>
                </div>
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
              <div className="sns sns-medium">
                <Link
                  to="https://medium.com/@raspberrylounge"
                  target="_blank"
                  className="sns-link"
                >
                  <IconMedium size={24} />
                  <span className="sr-only">Medium</span>
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
