import React from "react";
import Principal from "../../images/imagemPrincipal.png";
import { Link } from "react-router-dom";
import Nav from "../nav";

const HomePage = () => {
  return (
    <>
      <Nav />
      <section className="bg-light">
        <main className="my-container container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 mt-5">
              <h1 className="text-left">
                <strong>Seu marketplace de fast foods.</strong>
              </h1>
              <p className="text-left mr-lg-5 mr-sm-0 mb-5 mt-5">
                <strong>
                  Ajudamos as pessoas a localizar o seu estabelecimento de fast
                  food de forma eficiente.
                </strong>
              </p>
              <div
                className="mt-3 text-center btn-group btn-group-toggle"
                data-toggle="buttons"
              >
                <label className="btn btn-success btn-lg active">
                  <input type="radio" name="options" id="option1" checked />{" "}
                  <strong>
                    <svg
                      className="bi bi-box-arrow-in-right"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.146 11.354a.5.5 0 0 1 0-.708L10.793 8 8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 1 8z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M13.5 14.5A1.5 1.5 0 0 0 15 13V3a1.5 1.5 0 0 0-1.5-1.5h-8A1.5 1.5 0 0 0 4 3v1.5a.5.5 0 0 0 1 0V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5h-8A.5.5 0 0 1 5 13v-1.5a.5.5 0 0 0-1 0V13a1.5 1.5 0 0 0 1.5 1.5h8z"
                      />
                    </svg>
                  </strong>
                </label>
                <label className="btn btn-success btn-lg">
                  <input type="radio" name="options" id="option2" />{" "}
                  <strong>
                    <Link to="/create-point">
                      Cadastre um ponto de fast food
                    </Link>
                  </strong>
                </label>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <img src={Principal} alt="Logo" width="100%" />
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
export default HomePage;
