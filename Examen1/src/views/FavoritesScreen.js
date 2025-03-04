import React from "react";
import { View } from "react-native";
import FavoritePlaces from "../components/FavoritePlaces";

const FavoritesScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <FavoritePlaces />
    </View>
  );
};

export default FavoritesScreen;
