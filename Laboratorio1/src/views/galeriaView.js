import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import styles from "../styles/galeria"; // Asegúrate de que el archivo de estilos esté correctamente configurado
import axios from "axios";

const ParqueImagesScreen = () => {
  const [parques, setParques] = useState([]); // Cambiamos de "volcanes" a "parques"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParques = async () => {
      try {
        // Cambiamos la URL para obtener los parques
        const response = await axios.get("http://192.168.100.35:5005/parque");
        setParques(response.data.data); // Ajustamos para obtener el array de parques
      } catch (err) {
        setError("Error al cargar las imágenes de los parques");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParques();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  const renderImage = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.imagen }} style={styles.image} />
      <Text style={styles.imageTitle}>{item.nombre}</Text>{" "}
      {/* Mostramos el nombre del parque */}
    </View>
  );

  return (
    <FlatList
      data={parques}
      renderItem={renderImage}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      numColumns={2} // Esto organiza las imágenes en 2 columnas
    />
  );
};

export default ParqueImagesScreen;
