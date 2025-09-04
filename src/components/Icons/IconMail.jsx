function IconMail({ size = 24, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22,8.32V18a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V8.69L4,9.78l7.52,4.1A1,1,0,0,0,12,14a1,1,0,0,0,.5-.14L20,9.49Z"
        fill="inherit"
      ></path>
      <path
        d="M22,6h0L20,7.18l-8,4.67L4,7.5,2,6.4V6A2,2,0,0,1,4,4H20A2,2,0,0,1,22,6Z"
        fill="inherit"
      ></path>
    </svg>
  );
}

export default IconMail;
