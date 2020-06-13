import React from "react";

function HeroMain() {
  return (
    <div className="hero__textbox">
      <div className="container">
        <h1 className="hero__title hero__logo">Texto</h1>
        <p className="hero__desc">
          Acompanhe a entrega de cargos do governo para o centrão.
        </p>
        <a href="#all-data" className="hero__btn">
          Ver os dados
        </a>
      </div>
    </div>
  );
}

export default HeroMain;
