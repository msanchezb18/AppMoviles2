import React from "react";
import { ScrollView, Text, Button } from "react-native";
import { insertPlace } from "../components/creaDB";
import styles from "../styles/parques";

const DetalleLugar = ({ route }) => {
  const { lugar } = route.params;

  const handleSaveFavorite = () => {
    insertPlace(lugar, (success) => {
      if (success) alert("Lugar agregado a favoritos.");
      else alert("No se pudo agregar, ya hay 5 favoritos.");
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{lugar.name}</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Ciudad:</Text> {lugar.city}
      </Text>
      <Button title="Agregar a Favoritos" onPress={handleSaveFavorite} />
    </ScrollView>
  );
};

export default DetalleLugar;
