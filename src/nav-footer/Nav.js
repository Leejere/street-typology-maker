import navStyles from "./Nav.module.css";
import React from "react";

function Nav() {
  const appName = "StMaker";
  const appSlogan = "Typology-ing your street";
  return (
    <nav className={navStyles.nav}>
      <div className={navStyles.left}>
        <h1 className={navStyles.title}>{appName}</h1>
      </div>
      <div className={navStyles.right}>
        <h2 className={navStyles.subtitle}>{appSlogan}</h2>
        <span className="material-symbols-outlined">info</span>
      </div>
    </nav>
  );
}

export default Nav;
