import React from "react";
import { Link } from "react-router-dom";

const modalSucess: React.FC = () => {
  return (
    <div className="pt-5 text-center vh-100 bg-dark">
      <svg
        style={{ color: "white" }}
        className=" mt-5 mb-5 bi bi-check2-circle"
        width="9em"
        height="9em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"
        />
        <path
          fill-rule="evenodd"
          d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"
        />
      </svg>
      <h1 style={{ color: "white" }} className="mt-5 mb-5">
        Cadastro realizado com sucesso!
      </h1>
      <div
        className="mt-5 text-center btn-group btn-group-toggle"
        data-toggle="buttons"
      >
        <label className="btn btn-success btn-lg active">
          <input type="radio" name="options" id="option1" checked />{" "}
          <strong>
            <svg
              className="bi bi-box-arrow-in-left"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.854 11.354a.5.5 0 0 0 0-.708L5.207 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0 0 1h9A.5.5 0 0 0 15 8z"
              />
              <path
                fill-rule="evenodd"
                d="M2.5 14.5A1.5 1.5 0 0 1 1 13V3a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 12 3v1.5a.5.5 0 0 1-1 0V3a.5.5 0 0 0-.5-.5h-8A.5.5 0 0 0 2 3v10a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-1.5a.5.5 0 0 1 1 0V13a1.5 1.5 0 0 1-1.5 1.5h-8z"
              />
            </svg>
          </strong>
        </label>
        <label className="btn btn-success btn-lg">
          <input type="radio" name="options" id="option2" />{" "}
          <strong>
            <Link to="/">Voltar</Link>
          </strong>
        </label>
      </div>{" "}
    </div>
  );
};

export default modalSucess;
