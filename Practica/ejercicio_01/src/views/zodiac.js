import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { style_01 } from "../styles/style_01";

const zodiacData = [
  {
    name: "Aries",
    dates: "21 de marzo - 19 de abril",
    element: "Fuego",
    celestialBody: "Marte",
    gemstone: "Diamante",
    image: require("../img/zodiac/aries.jpg"),
  },
  {
    name: "Tauro",
    dates: "20 de abril - 20 de mayo",
    element: "Tierra",
    celestialBody: "Venus",
    gemstone: "Esmeralda",
    image: require("../img/zodiac/Tauro.jpg"),
  },
  {
    name: "Géminis",
    dates: "21 de mayo - 20 de junio",
    element: "Aire",
    celestialBody: "Mercurio",
    gemstone: "Ágata",
    image: require("../img/zodiac/geminis.jpg"),
  },
  {
    name: "Cáncer",
    dates: "21 de junio - 22 de julio",
    element: "Agua",
    celestialBody: "Luna",
    gemstone: "Perla",
    image: require("../img/zodiac/cancer.jpg"),
  },
  {
    name: "Leo",
    dates: "23 de julio - 22 de agosto",
    element: "Fuego",
    celestialBody: "Sol",
    gemstone: "Rubí",
    image: require("../img/zodiac/leo.jpg"),
  },
  {
    name: "Virgo",
    dates: "23 de agosto - 22 de septiembre",
    element: "Tierra",
    celestialBody: "Mercurio",
    gemstone: "Zafiro",
    image: require("../img/zodiac/virgo.jpg"),
  },
  {
    name: "Libra",
    dates: "23 de septiembre - 22 de octubre",
    element: "Aire",
    celestialBody: "Venus",
    gemstone: "Ópalo",
    image: require("../img/zodiac/libra.jpg"),
  },
  {
    name: "Escorpio",
    dates: "23 de octubre - 21 de noviembre",
    element: "Agua",
    celestialBody: "Plutón y Marte",
    gemstone: "Topacio",
    image: require("../img/zodiac/escorpio.jpg"),
  },
  {
    name: "Sagitario",
    dates: "22 de noviembre - 21 de diciembre",
    element: "Fuego",
    celestialBody: "Júpiter",
    gemstone: "Turquesa",
    image: require("../img/zodiac/sagitario.jpg"),
  },
  {
    name: "Capricornio",
    dates: "22 de diciembre - 19 de enero",
    element: "Tierra",
    celestialBody: "Saturno",
    gemstone: "Granate",
    image: require("../img/zodiac/capricornio.png"),
  },
  {
    name: "Acuario",
    dates: "20 de enero - 18 de febrero",
    element: "Aire",
    celestialBody: "Urano y Saturno",
    gemstone: "Amatista",
    image: require("../img/zodiac/acuario.jpg"),
  },
  {
    name: "Piscis",
    dates: "19 de febrero - 20 de marzo",
    element: "Agua",
    celestialBody: "Neptuno y Júpiter",
    gemstone: "Aguamarina",
    image: require("../img/zodiac/piscis.jpg"),
  },
];

const Zodiac = () => {
  return (
    <View>
      <View style={style_01.divHeader}>
        <Text style={style_01.h1}>Signos Zodiacales</Text>
      </View>

      <View style={style_01.divMain}>
        <ScrollView>
          {zodiacData.map((item, index) => (
            <View style={style_01.tarjeta} key={index}>
              <Image source={item.image} style={style_01.image} />
              <View>
                <Text>Nombre: {item.name}</Text>
                <Text>Fechas: {item.dates}</Text>
                <Text>Elemento: {item.element}</Text>
                <Text>Cuerpo Celeste: {item.celestialBody}</Text>
                <Text>Piedra: {item.gemstone}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={style_01.divFooter}>
        <Text style={style_01.textFooter}>Guía Zodiacal</Text>
        <Text style={style_01.textFooter}>Astrología y sus secretos</Text>
      </View>
    </View>
  );
};

export default Zodiac;
