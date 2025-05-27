import { Link } from "react-router";
import "./Header.scss";

function Header() {
  return (
    <header id="header">
      <ul className="menu">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/works">Test</Link>
        </li>
        {/* <li><Link to="/contact">Contact</Link></li> */}
      </ul>
    </header>
  );
}

export default Header;
