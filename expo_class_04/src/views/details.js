import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { style_01 } from "../styles/style_01";

const Details = () => {
  return (
    <SafeAreaView style={style_01.cont}>
      <View>
        <Text style={style_01.h1}>Details View</Text>
      </View>
    </SafeAreaView>
  );
};

export default Details;
