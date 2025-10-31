export const RocketPathMobile = ({ className, pathRef }) => {
  return (
    <svg viewBox="0 0 100 1400" className={className}>
      {/* 배경 타임라인 */}
      <path
        d="M50 50 L50 1350"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeDasharray="5,10"
        opacity="0.3"
      />
      {/* Progress 타임라인 */}
      <path
        ref={pathRef}
        className="timeline-progress"
        d="M50 50 L50 1350"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeDasharray="5,10"
        opacity="0.8"
        strokeDashoffset="100%"
        style={{
          pathLength: 1,
        }}
      />
    </svg>
  );
};
