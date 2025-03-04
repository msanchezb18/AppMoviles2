import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { fetchLugares } from "../redux/lugaresSlice";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/parques";
import { getConnection, insertPlace } from "../components/creaDB";

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const lugares = useSelector((state) => state.lugares.data);

  const [location, setLocation] = useState("Barcelona");
  const [category, setCategory] = useState("poi");
  const [keyword, setKeyword] = useState("");
  const [source, setSource] = useState("GooglePlaces");

  useEffect(() => {
    dispatch(
      fetchLugares({
        location,
        category,
        keyword,
        source,
        limit: 10,
      })
    );
  }, [location, category, keyword, source]);

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Desarrollado por Entidad Creativa</Text>
      <Text style={styles.footerText}>2025 Derechos Reservados</Text>
    </View>
  );

  const handleAddFavorite = async (item) => {
    try {
      const db = await getConnection();
      await insertPlace(db, {
        place_id: item.id.toString(),
        name: item.name,
        city: location,
      });
      alert("¡Lugar agregado a favoritos!");
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lugares Turísticos</Text>

      <Button
        title="Ver Mis Favoritos"
        onPress={() => navigation.navigate("Favoritos")}
        color="#4CAF50"
        style={styles.favoriteButton}
      />

      {/* Selección de Ciudad */}
      <Picker
        selectedValue={location}
        onValueChange={(value) => setLocation(value)}
        style={styles.picker}
      >
        {[
          "Amsterdam",
          "Barcelona",
          "Berlin",
          "Dubay",
          "London",
          "Paris",
          "Rome",
          "Tuscany",
        ].map((city) => (
          <Picker.Item key={city} label={city} value={city} />
        ))}
      </Picker>

      {/* Selección de Categoría */}
      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={styles.picker}
      >
        {["accommodation", "attraction", "poi", "restaurant"].map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>

      {/* Selección de Fuente */}
      <Picker
        selectedValue={source}
        onValueChange={(value) => setSource(value)}
        style={styles.picker}
      >
        {["Booking", "Facebook", "Foursquare", "GooglePlaces"].map((src) => (
          <Picker.Item key={src} label={src} value={src} />
        ))}
      </Picker>

      {/* Búsqueda por Palabra Clave */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por palabra clave..."
        value={keyword}
        onChangeText={setKeyword}
      />

      {/* Lista de Lugares */}
      <FlatList
        data={lugares.slice(0, 10)}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detalles", { lugar: item })}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => handleAddFavorite(item)}
            >
              <Text style={styles.favoriteButtonText}>
                ⭐ Agregar a Favoritos
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default Home;
