import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "../styles/about";

import Camis from "../img/Casm.jpg";
import Danis from "../img/Danis.jpg";
//import Member3Photo from '../img/Member3.png';

const AboutScreen = () => {
  const groupName = "Swifties";

  const members = [
    {
      name: "Camila Sánchez Bejarano",
      photo: Camis,
      info: "Tengo 24 años, Soy de San Mateo de Alajuela, Estudio en la UTN sede del Roble, tengo 2 perros uno se llama Theo y el otro Milán.",
    },
    {
      name: "David Ruiz Vargas",
      photo: "https://via.placeholder.com/150", // Imagen local
      info: "Estudiante de la carrera de Ingeniería de la Información en la UTN con sede en el Roble, tengo 20 años, soy vecino de Esparza.",
    },
    {
      name: "Daniela Carvajal Pizarro",
      photo: Danis, // Imagen local
      info: "Vivo en Barranca, tengo 21 años, mi cantante favorita es Taylor Swift, soy de la carrera de Tecnologías de la Información en la UTN del Roble.",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{groupName}</Text>
      {members.map((member, index) => (
        <View key={index} style={styles.memberContainer}>
          <Image source={member.photo} style={styles.photo} />
          <Text style={styles.memberName}>{member.name}</Text>
          <Text style={styles.memberInfo}>{member.info}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AboutScreen;
