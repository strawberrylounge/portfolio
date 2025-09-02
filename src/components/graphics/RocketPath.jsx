export const RocketPath = ({ className, pathRef }) => {
  return (
    <svg viewBox="0 0 1000 1400" className={className}>
      <path
        ref={pathRef}
        d="M400 50 Q200 150 300 300 Q500 450 200 600 Q50 750 300 900 Q500 1050 400 1150"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeDasharray="5,10"
        opacity="0.65"
      />
    </svg>
  );
};
