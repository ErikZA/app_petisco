import React from "react";
import Nav from "../nav";
import { Link } from "react-router-dom";

const CreatePoint = () => {
  return (
    <>
      <Nav></Nav>
      <section className="mb-5 bg-light">
        <div className="container">
          <form className="bg-white pr-lg-5 pl-lg-5 mr-lg-5 ml-lg-5 pr-sm-1 pl-sm-1 mr-sm-1 ml-sm-1">
            <div>
              <h1>
                Cadastro do <br />
                ponto de fast food
              </h1>
            </div>
            imagem aki
            <div className="mt-5 form-group">
              <h4>Dados</h4>
              <label htmlFor="formGroupExampleInput">Example label</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Example input placeholder"
              />
            </div>
            <div className="form-row">
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="formGroupExampleInput">Example label</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="formGroupExampleInput">Example label</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
            </div>
            <br />
            <div className="form-row">
              <h4 className="mr-auto">Endereço</h4>
              <p>Selecione o endereço no mapa</p>
            </div>
            mapa aki
            <div className="form-row">
              <div className="col-lg-5 col-sm-12">
                <label htmlFor="formGroupExampleInput">Example label</label>
                <select className="form-control">
                  <option>Default select</option>
                </select>
              </div>
              <div className="col-lg-5 col-sm-10">
                <label htmlFor="formGroupExampleInput">Example label</label>
                <select className="form-control">
                  <option>Default select</option>
                </select>
              </div>
              <div className="col-lg-2 col-sm-2">
                <label htmlFor="formGroupExampleInput">Example label</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
            </div>
            <br />
            <div className="form-row">
              <h4 className="mr-auto">Ítens do fast food</h4>
            </div>
            <div className="form-row">
              <div className="col-lg-3 col-sm-4">
                <label htmlFor="formGroupExampleInput">1</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="col-lg-3 col-sm-4">
                <label htmlFor="formGroupExampleInput">2</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="col-lg-3 col-sm-4">
                <label htmlFor="formGroupExampleInput">3</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
              <div className="col-lg-3 col-sm-4">
                <label htmlFor="formGroupExampleInput">4</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="col-lg-3 col-sm-4">
                <label htmlFor="formGroupExampleInput">5</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
              <div className="col-lg-3 col-sm-4">
                <label htmlFor="formGroupExampleInput">6</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="col-lg-3 col-sm-4">
                <label htmlFor="formGroupExampleInput">7</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
              <div className="col-lg-3 col-sm-4">
                <label htmlFor="formGroupExampleInput">8</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="col-lg-3 col-sm-4">
                <label htmlFor="formGroupExampleInput">9</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
              <div className="col-lg-3 col-sm-4">
                <label htmlFor="formGroupExampleInput">10</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="col-lg-3 col-sm-4">
                <label htmlFor="formGroupExampleInput">11</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
              <div className="col-lg-3 col-sm-4">
                <label htmlFor="formGroupExampleInput">12</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
            </div>
            <div className="mt-5 form-row">
              <button type="submit" className="mr-auto btn btn-success btn-lg">
                Sign in
              </button>
              <Link to="/" type="submit" className=" btn btn-secondary btn-lg">
                Voltar
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export default CreatePoint;
