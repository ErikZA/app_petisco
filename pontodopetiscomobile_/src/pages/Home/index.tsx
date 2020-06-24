import React, { useState, useEffect, ChangeEvent } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, Image, Alert } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import api from "../../service/api";
import RNPickerSelect from "react-native-picker-select";

import { styles, pickerSelectStyles } from "./styles";

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

const Home: React.FC = () => {
  const [initials, setInitials] = useState<UF[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedStateBr, setselectedStateBr] = useState<StateBr[]>([]);
  const [selectedCity, setSelectedCity] = useState("0");

  const navigation = useNavigation();

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
      .catch(() => Alert.alert("Erro na API do IBGE"));
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
      .catch(() => Alert.alert("Erro na API do IBGE"));
  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate("Points", {
      point_uf: selectedUf,
      point_city: selectedCity,
    });
  }

  return (
    <>
      <View style={styles.logo}>
        <Image
          style={styles.img}
          source={require("../../../assets/icon.png")}
        ></Image>
        <Text style={styles.app}>#Ponto do Petisco</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Seu marketplace de fast foods</Text>
          <Text style={styles.description}>
            Ajudamos pessoas a encontrarem o seu ponto de fast food de forma
            eficiente.
          </Text>
        </View>
        <View>
          <RNPickerSelect
            placeholder={{
              label: "Selecione uma Estado",
              value: null,
              color: "#323153",
            }}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            Icon={() => {
              return <Feather name="arrow-down" color="#ffcc00" size={24} />;
            }}
            value={selectedUf}
            onValueChange={(value) => setSelectedUf(value)}
            useNativeAndroidPickerStyle={false}
            items={initials?.map((UF) => {
              return {
                label: `${UF?.name} - ${UF?.initials}`,
                value: UF?.initials,
              };
            })}
          />
          <RNPickerSelect
            placeholder={{
              label: "Selecione uma Cidade",
              value: null,
              color: "#323153",
            }}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            Icon={() => {
              return <Feather name="arrow-down" color="#ffcc00" size={24} />;
            }}
            value={selectedCity}
            onValueChange={(value) => setSelectedCity(value)}
            useNativeAndroidPickerStyle={false}
            items={selectedStateBr?.map((city) => {
              return {
                label: city?.name,
                value: city?.name,
              };
            })}
          />
        </View>
        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Feather name="arrow-right" color="#fff" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </View>
    </>
  );
};

export default Home;
