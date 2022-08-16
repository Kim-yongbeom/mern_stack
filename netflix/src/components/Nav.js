import React, { useEffect, useState } from "react";
import netflix from "../pngwing.png";
import "./Nav.css";

function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <nav className={`nav ${show && "nav__black"} `}>
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
