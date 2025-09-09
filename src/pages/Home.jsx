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
import { Astronaut } from "../components/Graphics/Astronaut";
import IconGithub from "../components/Icons/IconGithub";
import IconLinkedin from "../components/Icons/IconLinkedin";
import IconMedium from "../components/Icons/IconMedium";

import "./Home.scss";

function Home() {
  const [activeSection, setActiveSection] = useState("section01");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [typingText, setTypingText] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [flipWords] = useState(["Designer's", "Creative", "Technical"]);
  const [currentFlipIndex, setCurrentFlipIndex] = useState(0);
  // const [animationsComplete, setAnimationsComplete] = useState(false);

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

  // section01 타이핑 애니메이션
  useEffect(() => {
    const text = "Exploring the Web Universe";
    let index = 0;

    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypingText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        // 타이핑 완료 후 설명 텍스트 표시
        setTimeout(() => {
          setShowDescription(true);
          // setAnimationsComplete(true);
        }, 500);
      }
    }, 100); // 타이핑 속도 조절

    return () => clearInterval(timer);
  }, []);

  // section02 플립 애니메이션
  useEffect(() => {
    const flipTimer = setInterval(() => {
      setCurrentFlipIndex((prev) => (prev + 1) % flipWords.length);
    }, 3000); // 3초마다 변경

    return () => clearInterval(flipTimer);
  }, [flipWords.length]);

  // 로켓 스크롤 애니메이션
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(MotionPathPlugin);

  useGSAP(() => {
    window.scrollTo(0, 0);

    // 애니메이션이 완료된 후에만 ScrollTrigger 실행 추기
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
          trigger: ".section04",
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
        <Astronaut className="astronaut" />
        <div className="inner">
          <h2 className="section-title">
            <span className="typing-text">{typingText}</span>
            <span className="cursor">|</span>
          </h2>
          <p
            className={`section-contents-text ${showDescription ? "show" : ""}`}
          >
            웹 기술은 우주처럼 방대하고 다양합니다.
            <br className="pc-only" />이 넓고 깊은 분야에서 웹 디자이너로 시작해
            프론트엔드 개발자로
            <br className="pc-only" />
            성장해온 저의 여정과 앞으로 나아가고 싶은 방향을 소개합니다.
          </p>
          {/* <p>
            웹 기술은 우주 같아요. 너무나 다양하고 방대한 기술이 존재해 누가
            IT업계에서 일하고 싶은데 혹은 개발자가 되고 싶은데 뭐부터 배워야 돼?
            라고 물으면 선뜻 대답하기가 어렵죠. 이처럼 넓고 깊은 이 분야에서
            제가 걸어온 길과 앞으로 나아가고 싶은 방향을 소개해 볼게요.
          </p> */}
        </div>
      </section>
      {/* section02: introduction 2 */}
      <section className="section section02">
        <div className="inner">
          <h2 className="section-title">
            A Developer with
            <div className="flip-container">
              <div className="flip-words">
                {flipWords.map((word, index) => (
                  <div
                    key={index}
                    className={`flip-word ${
                      index === currentFlipIndex ? "active" : ""
                    }`}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
            Eyes
          </h2>
          <p className="section-contents-text">
            아 텍스트 존나 어려워어여뤄여뭐라고 정리하지?
            <br className="pc-only" />
            미치겠네요 그러니까 저는 그냥 만들고 있습니다
            <br className="pc-only" />
            알겠죠? 모르면 말아
            <br className="pc-only" />
            최대 5줄까지 정리해야 할지도
            <br className="pc-only" />
            모르겠다. 텍스트텍스트 가나다라마바사아자차카타파하!
          </p>
          {/* 웹 디자인의 세계로 이끌었습니다. HTML과 CSS로 아름다운 페이지를
            구현하는 과정에서 큰 기쁨을 느꼈고, JavaScript 애니메이션을 통해
            새로운 도전의 재미를 발견했습니다. 웹 디자이너에서 퍼블리셔, 그리고
            프론트엔드 개발자로의 전환 과정에서 웹 접근성, 반응형 웹, Angular와
            TypeScript까지 다양한 기술을 익혔습니다. 새로운 것에 대한 끊임없는
            호기심이 저를 성장시키는 원동력입니다. 디자이너의 시각을 가진
            개발자로서, 팀 간의 소통을 원활하게 하는 것이 저의 가장 큰
            강점이라고 생각합니다. */}
          {/* <p>
            어릴 적 저의 꿈은 배우였습니다. 프랑스에서 연극과 영화를 공부하며
            저의 열정을 쏟았습니다. 그러나 가정 사정으로 한국으로 돌아오게
            되었습니다. 이런 변화의 중심에서 저는 가능한 한 저와 관련된 분야에서
            일하고 싶었습니다. 그렇게 시작된 영상 디자인에 대한 탐색은 웹
            디자인의 세계를 만나게 했습니다. 웹 디자인은 저에게 끊임없는 매력을
            안겨주었습니다. 클라이언트의 피드백을 받고, 제 작업물이 실제로 웹
            사이트에 반영되는 과정은 끊임없는 보람을 주었습니다. 특히 HTML와
            CSS를 사용한 페이지 디자인은 제게 큰 흥미를 불러일으켰습니다. 코드
            몇 줄로도 아름다운 페이지를 구현할 수 있다는 사실은 제게 큰 기쁨을
            안겨주었습니다. 또한, CSS와 javaScript로 애니메이션을 구현하는
            과정에서도 새로운 도전과 재미를 느꼈습니다. 퍼블리셔로 전직을 한 뒤,
            웹 접근성에 대해 배우게 되었습니다. 그리고 점점 더 많은 학습을 하게
            되었습니다. 웹 호환성, 반응형 웹사이트 제작 등, 퍼블리셔로서 필요한
            기술들을 습득하였습니다. 더불어 당시 재직 중이었던 회사에서 Angular,
            TypeScript, SCSS를 다루며 개발을 할 수 있는 기회를 얻게 되었습니다.
            결국 프론트엔드 개발자로 진로를 정하게 되었고, 약 6개월 동안 국가
            지원 풀스택 개발자 양성 과정을 통해 다양한 기술을 익혔습니다. 이
            과정은 짧은 시간 동안 많은 내용을 학습해야 했기 때문에 모든 것을
            깊게 파고들지는 못했지만, 웹 사이트 개발 프로세스를 확실히 이해할 수
            있었습니다. 또한, 다양한 개발 분야 중 제가 가진 강점을 발견하는
            데에도 도움이 되었습니다. 이를 통해 저는 프론트엔드 개발자로서
            성장하고 있습니다. 저는 항상 새로운 것에 대한 호기심을 갖고
            있습니다. 제 호기심은 새로운 기술을 익히는 데 큰 도움이 되었습니다.
            전직을 두 번 한 것도 호기심에 대한 결과라고 생각합니다. 그리고 그
            덕분에, 저는 웹 디자이너의 업무를 더 잘 이해하는 퍼블리셔, 그리고
            프론트엔드 개발자가 되었습니다. 이 점이 타 팀과의 소통에 매우 도움이
            되고 제 장점이라고 생각합니다."
          </p> */}
        </div>
      </section>
      {/* section03: works */}
      <section className="section section03">
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
      {/* section04: career */}
      <section className="section section04">
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
      {/* section05: contact */}
      <section className="section section05">
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
