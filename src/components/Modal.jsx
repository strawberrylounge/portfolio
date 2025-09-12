import { useEffect } from "react";

import IconClose from "./Icons/IconClose";

import "./Modal.scss";

function Modal({ isOpen, onClose, projectData, children }) {
  // ESC 키 활성화 시 모달 닫힘 + 배경 스크롤 방지
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    let scrollY = 0;

    if (isOpen) {
      // 스크롤 위치 저장
      scrollY = window.scrollY;

      // 배경 스크롤 방지
      document.body.style.cssText = `
        position: fixed;
        top: -${scrollY}px;
        width: 100%;
        overflow-y: hidden;
      `;

      // ESC 키 이벤트 등록
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (scrollY > 0) {
        document.body.style.cssText = ``;
        window.scrollTo(0, scrollY);
      }
    };
  }, [isOpen, onClose]);

  const { title, company, period, role, techStack, images, links, summary } =
    projectData || {};

  // 기술 스택별 클래스 매핑
  const getTechClass = (tech) => {
    const techClassMap = {
      // 마크업
      HTML: "default",

      // 스타일
      SCSS: "style",
      CSS: "style",
      Tailwind: "style",
      Bootstrap: "style",
      "Material UI": "style",
      "Styled Components": "style",
      Emotion: "style",

      // 프론트엔드 스크립트
      React: "script",
      JavaScript: "script",
      TypeScript: "script",
      "Next.js": "script",
      "Vue.js": "script",
      Angular: "script",
      "Nuxt.js": "script",

      // 웹서버
      "Node.js": "server",
      "Nest.js": "server",
      Spring: "server",
      Express: "server",
      Redis: "server",

      // 배포
      AWS: "deploy",
      Netlify: "deploy",
      Vercel: "deploy",

      // 협업툴
      Figma: "tool",
      Zeplin: "tool",
      Slack: "tool",
      Notion: "tool",
      github: "tool",
      gitlab: "tool",
    };

    return techClassMap[tech] || "default";
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        {/* 헤더 영역 */}
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="btn-modal-close">
            <IconClose size={18} color="#999" />
          </button>
        </div>

        <div className="modal-body">
          {/* 기본 정보 영역 */}
          <div className="modal-info">
            <div className="info-grid">
              <div className="info">
                소속:
                <span>{company}</span>
              </div>
              <div className="info">
                기간:
                <span>{period}</span>
              </div>
              <div className="info">
                역할:
                <span>{role}</span>
              </div>
            </div>
            {techStack && (
              <div className="tech-stack">
                {techStack.map((tech) => (
                  <span key={tech} className={`tag-tech ${getTechClass(tech)}`}>
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {summary && <p className="summary">{summary}</p>}
          </div>

          {/* 이미지 영역 (있을 때만) */}
          {images && (
            <div className="modal-images">
              {images.map((img, idx) => (
                <img key={idx} src={img.src} alt={img.alt} />
              ))}
            </div>
          )}

          {/* 자유 콘텐츠 영역 */}
          <div className="modal-description">{children}</div>

          {/* 링크 영역 (있을 때만) */}
          {links && (
            <div className="modal-links">
              {links.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
