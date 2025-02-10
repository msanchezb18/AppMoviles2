import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";
import styles from "../styles/parques"; // Asegúrate de que el archivo de estilos esté correctamente configurado

const DetailsParquesScreen = () => {
  const [parques, setParques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParques = async () => {
      try {
        // Cambiamos la URL para que apunte al endpoint de parques
        const response = await axios.get("http://192.168.100.35:5005/parque");
        setParques(response.data.data); // Ajustamos para obtener el array de parques
      } catch (err) {
        setError("Error al cargar los parques");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParques();
  }, []);

  const renderParque = ({ item }) => (
    <View style={styles.parqueContainer}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Image
        source={{ uri: item.imagen }}
        style={styles.image}
        onError={(e) =>
          console.log("Error al cargar la imagen:", e.nativeEvent.error)
        }
      />
      <Text style={styles.text}>
        <Text style={styles.bold}>Ubicación:</Text> {item.ubicacion}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Extensión:</Text> {item.extension} hectáreas
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Descripción:</Text> {item.descripcion}
      </Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Desarrollado por Entidad Creativa</Text>
      <Text style={styles.footerText}>2025 Derechos Reservados</Text>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={parques}
        renderItem={renderParque}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 50 }} // Espacio extra en la parte inferior
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        getItemLayout={(data, index) => ({
          length: 300,
          offset: 300 * index,
          index,
        })}
        ListFooterComponent={renderFooter} // Agregamos el Footer
      />
    </View>
  );
};

export default DetailsParquesScreen;
