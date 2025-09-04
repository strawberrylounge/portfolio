export const RocketPath = ({ className, pathRef }) => {
  return (
    <svg viewBox="0 0 1000 1400" className={className}>
      <path
        ref={pathRef}
        d="M500 50 Q400 150 500 300 Q700 450 400 600 Q250 750 500 900 Q700 1050 500 1150"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeDasharray="5,10"
        opacity="0.65"
      />
    </svg>
  );
};
