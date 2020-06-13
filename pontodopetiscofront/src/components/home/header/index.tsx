import React from "react";

import HeroNav from "./nav";
import HeroMain from "./main";

const HeaderComponent = () => {
  return (
    <header className="hero">
      <HeroNav />
      <HeroMain />
    </header>
  );
};

export default HeaderComponent;
