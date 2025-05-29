function IconArrowUp({ size = 24, color = "currentColor" }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v13m0-13 4 4m-4-4-4 4"
      />
    </svg>
  );
}

export default IconArrowUp;
