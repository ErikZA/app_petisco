import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";
import Spinner from "react-native-loading-spinner-overlay";

import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";
import api from "../../service/api";
import { Linking } from "expo";

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    UF: string;
    number: number;
  };
  items: {
    title: string;
  }[];
}

const Detail: React.FC = () => {
  const navigate = useNavigation();
  const route = useRoute();
  const [data, setData] = useState<Data>({} as Data);
  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigate.goBack();
  }

  function handleComposerMail() {
    MailComposer.composeAsync({
      subject: "Iteresse em encomendas",
      recipients: [data.point.email],
    });
  }

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=Iteresse em encomendas`
    );
  }

  if (!data.point) {
    return null;
  }

  return (
    <>
      {!data.point.email && (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
      )}
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={20} color="#ffcc00"></Feather>
        </TouchableOpacity>
        <Image
          source={{ uri: data.point.image_url }}
          style={styles.pointImage}
        ></Image>
        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map((item) => item.title).join(", ")}
        </Text>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.point.city} - {data.point.UF}
          </Text>
          <Text style={styles.addressContent}>Nº {data.point.number}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton
          style={styles.button}
          onPress={() => {
            handleWhatsapp();
          }}
        >
          <FontAwesome name="whatsapp" size={24} color="#fff" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton
          style={styles.button}
          onPress={() => {
            handleComposerMail();
          }}
        >
          <Feather name="mail" size={24} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </>
  );
};

export default Detail;
