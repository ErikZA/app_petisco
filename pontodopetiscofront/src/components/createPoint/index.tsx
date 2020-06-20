import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Nav from "../nav";
import { Link, useHistory } from "react-router-dom";
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
  const [stateForm, setStateForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
    number: "",
  });
  const [stateSelectedFoods, setStateSelectedFoods] = useState<number[]>([]);
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

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setinitialPosotion([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api
      .get("foods")
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

  function inputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setStateForm({ ...stateForm, [name]: value });
  }

  function foodClicked(id: number) {
    const alredySelcted = stateSelectedFoods.findIndex((item) => item === id);

    if (alredySelcted >= 0) {
      const filteredItems = stateSelectedFoods.filter((item) => item !== id);
      setStateSelectedFoods(filteredItems);
    } else {
      setStateSelectedFoods([...stateSelectedFoods, id]);
    }
  }
  async function handlerSubmit(event: FormEvent) {
    event.preventDefault();
    const { name, email, whatsapp, number } = stateForm;
    const UF = selectedUf;
    const city = selecteCity;
    const [latitude, longitude] = clickUser;
    const foods = stateSelectedFoods;
    const data = {
      image: "fake.png",
      name,
      email,
      whatsapp,
      number,
      UF,
      city,
      foods,
      latitude,
      longitude,
    };
    if (foods.length > 0) {
      await api.post("points", data);
      history.push("create-success");
    } else {
      alert("Um ou mais Fast Foods devem ser selecionados");
    }
  }

  return (
    <>
      <Nav></Nav>
      <section className="mb-5 bg-light">
        <div className="container">
          <form
            onSubmit={handlerSubmit}
            className="bg-white pr-lg-5 pl-lg-5 mr-lg-5 ml-lg-5 pr-sm-1 pl-sm-1 mr-sm-1 ml-sm-1"
          >
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
                onChange={inputChange}
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Meu fast food"
                required
                minLength={5}
              />
            </div>
            <div className="form-row">
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="email">Email</label>
                <input
                  onChange={inputChange}
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="exemplo@gmail.com"
                  required
                />
              </div>
              <div className="col-lg-6 col-sm-12">
                <label htmlFor="fone">WhatsApp</label>
                <input
                  onChange={inputChange}
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  className="form-control"
                  placeholder="(43) 99999-9999"
                  required
                  minLength={9}
                  maxLength={15}
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
                  required
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
                  required
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
                  onChange={inputChange}
                  type="text"
                  id="number"
                  name="number"
                  className="form-control"
                  placeholder="Numero"
                  required
                  minLength={1}
                />
              </div>
            </div>
            <br />
            <div className="form-row">
              <h4 className="mr-auto mt-3 mb-3">Ítens do fast food</h4>

              <p>Selecione um ou mais ítens abaixo</p>
            </div>
            <div className="text-center form-row">
              {state.map((item) => (
                <div
                  onClick={() => foodClicked(item.id)}
                  key={item.id}
                  className="mt-5 mb-2 col-lg-3 col-sm-4"
                >
                  <div
                    className={
                      stateSelectedFoods.includes(item.id)
                        ? "selectedFoods"
                        : "imgFood"
                    }
                  >
                    <img src={item.image_url} alt="foods" width="70%" />
                  </div>
                  <strong className="">{item.title}</strong>
                </div>
              ))}
            </div>
            <div className="mt-5 form-row">
              <button type="submit" className="mr-auto btn btn-success btn-lg">
                Cadastrar
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
