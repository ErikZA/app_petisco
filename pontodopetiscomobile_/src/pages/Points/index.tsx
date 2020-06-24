import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import MapViw, { Marker } from "react-native-maps";
import Spinner from "react-native-loading-spinner-overlay";

import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../service/api";
import * as Location from "expo-location";

enum PermissionStatus {
  GRANTED = "granted",
  UNDETERMINED = "undetermined",
  DENIED = "denied",
}

interface Params {
  point_uf: string;
  point_city: string;
}

interface Food {
  id: number;
  title: string;
  image_url: string;
}

interface Point {
  id: number;
  image: string;
  image_url: string;
  name: string;
  latitude: number;
  longitude: number;
}

const Points: React.FC = () => {
  const navigate = useNavigation();
  const [foods, setFoods] = useState<Food[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [status, setStatus] = useState<PermissionStatus>();
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    api.get("foods").then((response) => {
      setFoods(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get("points", {
        params: {
          city: routeParams.point_city ? routeParams.point_city : "Nova Fátima",
          UF: routeParams.point_uf ? routeParams.point_uf : "PR",
          items: selectedFoods,
        },
      })
      .then((response) => {
        setPoints(response.data);
      })
      .catch(() => Alert.alert("Falha ao indentificar localização"));
  }, [selectedFoods, routeParams.point_city]);

  useEffect(() => {
    async function loadPosition() {
      await Location.requestPermissionsAsync()
        .then(async (response) => {
          setStatus(response.status);
          if (status !== "granted") {
            return (
              <Spinner
                visible={true}
                textContent={"Loading..."}
                textStyle={styles.spinnerTextStyle}
              ></Spinner>
            );
          }

          const locationNow = await Location.getCurrentPositionAsync();
          const { latitude, longitude } = locationNow.coords;
          setInitialPosition([latitude, longitude]);
        })
        .catch(() => {
          Alert.alert("Erro", "Precisamos de sua permissão para continuar");
          setTimeout(() => {
            loadPosition();
          }, 2000);
        });
    }
    loadPosition();
  }, [points]);

  function foodClicked(id: number) {
    const alredySelcted = selectedFoods.findIndex((item) => item === id);

    if (alredySelcted >= 0) {
      const filteredItems = selectedFoods.filter((item) => item !== id);
      setSelectedFoods(filteredItems);
    } else {
      setSelectedFoods([...selectedFoods, id]);
    }
  }

  function handleNavigateBack() {
    navigate.goBack();
  }

  function handleNavigateToDetails(id: number) {
    navigate.navigate("Detail", { point_id: id });
  }
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={20} color="#ffcc00"></Feather>
        </TouchableOpacity>
        <Text style={styles.title}>Bem Vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um Fast Food.</Text>

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 ? (
            <MapViw
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
              style={styles.map}
            >
              {points.map((point) => (
                <Marker
                  key={String(point.id)}
                  style={styles.mapMarker}
                  onPress={() => {
                    handleNavigateToDetails(point.id);
                  }}
                  coordinate={{
                    latitude: Number(point.latitude),
                    longitude: Number(point.longitude),
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      source={{
                        uri: point.image_url,
                      }}
                      style={styles.mapMarkerImage}
                    />
                    <Text style={styles.mapMarkerTitle}>{point?.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapViw>
          ) : (
            <Spinner
              visible={true}
              textContent={"Loading..."}
              textStyle={styles.spinnerTextStyle}
            />
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {foods.map((food) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={String(food.id)}
                onPress={() => {
                  foodClicked(food.id);
                }}
                style={[
                  styles.item,
                  selectedFoods.includes(food.id) ? styles.selectedItem : {},
                ]}
              >
                <Image
                  source={{ uri: food.image_url }}
                  style={{ width: 42, height: 42 }}
                />
                <Text style={styles.itemTitle}>{food.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default Points;
