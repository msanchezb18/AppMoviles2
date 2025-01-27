import React from "react";
import { SafeAreaView, View } from "react-native";

import GetNote from "../components/getNote";

const InfoNote = ({ navigation }) => {
  const valores = navigation.getState();
  const token = valores.routes[1].params.token;

  return (
    <SafeAreaView>
      <View>
        <GetNote navegar={navigation} token={token} />
      </View>
    </SafeAreaView>
  );
};

export default InfoNote;
