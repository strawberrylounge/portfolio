import IconArrowUp from "../Icons/IconArrowUp";

import "./BtnTop.scss";

function BtnTop({ onClick }) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onClick?.(); // onClick이 전달되면 실행, 안 되면 무시
  };
  return (
    <button type="button" className="btn-top" onClick={handleClick}>
      <span className="sr-only">위로 가기</span>
      <IconArrowUp color="black" />
    </button>
  );
}

export default BtnTop;
