import React from "react";
import { isBrowser } from "react-device-detect";
import Icon from "../../images/icon.png";

const Nav = () => {
  const url = document.location.href;
  const msg = "Encontre o ponto certo para apreciar um bom salgadinho.";
  return (
    <nav
      id="PontoCerto"
      className="navbar navbar-expand-sm navbar-light bg-light"
    >
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" className="collapse navbar-collapse">
          <a href="#PontoCerto" className="mr-auto navbar-brand hero__logo">
            {" "}
            <img
              src={Icon}
              width="40"
              height="35"
              className="d-inline-block align-top"
              alt="Icon"
            />
            <strong>#PontoCerto</strong>
          </a>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a
                className="nav-link"
                rel="noreferrer"
                href={`http://twitter.com/intent/tweet?url=${url}&text=${msg}`}
                target="blank"
              >
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            {isBrowser ? (
              <li className="nav-item active">
                <a
                  className="nav-link"
                  rel="noreferrer"
                  href={`https://www.facebook.com/share.php?u=${url}&quote=${msg}`}
                  target="blank"
                >
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
            ) : (
              <li className="nav-item active">
                <a
                  className="nav-link"
                  rel="noreferrer"
                  href={`https://www.facebook.com/share.php?u=${url}&quote=${msg}`}
                  target="blank"
                >
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
            )}
            {isBrowser ? (
              <li className="nav-item active">
                <a
                  className="nav-link"
                  rel="noreferrer"
                  href={`https://web.whatsapp.com/send?text=${msg}${" "}${url}`}
                  target="blank"
                >
                  <i className="fa fa-whatsapp"></i>
                </a>
              </li>
            ) : (
              <li className="nav-item active">
                <a
                  className="nav-link"
                  rel="noreferrer"
                  href={`https://api.whatsapp.com/send?text=${msg}${" "}${url}`}
                >
                  <i className="fa fa-whatsapp"></i>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
