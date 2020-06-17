import React, { useState, useEffect, ChangeEvent } from "react";
import Nav from "../nav";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet";
import axios from "axios";
import api from "../../service/api";
import { LeafletMouseEvent } from "leaflet";

interface Items {
  id: number;
  title: string;
  image_url: string;
}

interface UF {
  id: number;
  name: string;
  initials: string;
}

interface StateBr {
  id: number;
  name: string;
}

interface IBGEResponse {
  id: number;
  sigla: string;
  nome: string;
}

const CreatePoint = () => {
  const [state, setState] = useState<Items[]>([]);
  const [initials, setInitials] = useState<UF[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedStateBr, setselectedStateBr] = useState<StateBr[]>([]);
  const [selecteCity, setSelectedselecteCity] = useState("0");
  const [clickUser, setclickUser] = useState<[number, number]>([0, 0]);
  const [initialPosotion, setinitialPosotion] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setinitialPosotion([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api
      .get("items")
      .then((response) => {
        setState(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios
      .get<IBGEResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        setInitials(
          response.data.map((state) => {
            return {
              id: state.id,
              name: state.nome,
              initials: state.sigla,
            };
          })
        );
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    api
      .get<IBGEResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        setselectedStateBr(
          response.data.map((state) => {
            return {
              id: state.id,
              name: state.nome,
            };
          })
        );
      })
      .catch((e) => console.log(e));
  }, [selectedUf]);

  function randonUF(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
  }

  function randonCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedselecteCity(event.target.value);
  }

  function randonClick(event: LeafletMouseEvent) {
    setclickUser([event.latlng.lat, event.latlng.lng]);
  }

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
            <div className="mt-5 form-group">
              <h4>Dados</h4>
              <label htmlFor="name">Nome da entidade</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Meu fast food"
              />
            </div>
            <div className="form-row">
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="exemplo@gmail.com"
                />
              </div>
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="fone">WhatsApp</label>
                <input
                  type="tel"
                  id="fone"
                  name="fone"
                  className="form-control"
                  placeholder="(43) 99999-9999"
                />
              </div>
            </div>
            <br />
            <div className="form-row">
              <h4 className="mr-auto">Endereço</h4>
              <p>Selecione o endereço no mapa</p>
            </div>
            <div className="mb-5 form-row">
              <Map center={initialPosotion} zoom={15} onclick={randonClick}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={clickUser} />
              </Map>
            </div>
            <div className="form-row">
              <div className="col-lg-5 col-sm-12">
                <label htmlFor="uf">Estado (UF)</label>
                <select
                  onChange={randonUF}
                  value={selectedUf}
                  name="uf"
                  id="uf"
                  className="form-control"
                >
                  <option value="0">Selecione uma UF</option>
                  {initials.map((uf) => (
                    <option key={uf.id} value={uf.id}>
                      {uf.name}, {uf.initials}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-5 col-sm-10">
                <label htmlFor="city">Cidade</label>
                <select
                  id="city"
                  onChange={randonCity}
                  value={selecteCity}
                  name="city"
                  className="form-control"
                >
                  <option value="0">Selecione uma cidade</option>
                  {selectedStateBr.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-2 col-sm-2">
                <label htmlFor="number">Numero</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  className="form-control"
                  placeholder="Numero"
                />
              </div>
            </div>
            <br />
            <div className="form-row">
              <h4 className="mr-auto">Ítens do fast food</h4>

              <p>Selecione um ou mais ítens abaixo</p>
            </div>
            <div className="text-center form-row">
              {state.map((item) => (
                <div key={item.id} className="mt-4 col-lg-3 col-sm-4">
                  <strong className="text-center">{item.image_url}</strong>
                  <img src={item.image_url} alt="test" width="80%" />
                </div>
              ))}
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
