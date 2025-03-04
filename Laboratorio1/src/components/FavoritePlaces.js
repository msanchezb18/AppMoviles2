import React, { useState, useEffect } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { createTable, getPlaces, deletePlace, clearPlaces } from "./creaDB";

const FavoritePlaces = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    createTable();
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    getPlaces((places) => setFavorites(places));
  };

  const handleDelete = (id) => {
    deletePlace(id, loadFavorites);
  };

  const handleClearAll = () => {
    clearPlaces(loadFavorites);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Mis Lugares Favoritos ({favorites.length}/5)
      </Text>

      <Button title="Vaciar lista" onPress={handleClearAll} />

      <FlatList
        data={favorites}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text>
              {item.name} - {item.city}
            </Text>
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={{ backgroundColor: "#ff4444", padding: 5 }}
            >
              <Text style={{ color: "white" }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default FavoritePlaces;
