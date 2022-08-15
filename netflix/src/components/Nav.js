import React from "react";
import netflix from "../pngwing.png";
import "./Nav.css";

function Nav() {
  return (
    <nav className="nav">
      <img
        alt="Netflix logo"
        src={netflix}
        className="nav__logo"
        onClick={() => window.location.reload()}
      />
      <img
        alt="User logged"
        src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"
        className="nav__avatar"
      />
    </nav>
  );
}

export default Nav;
