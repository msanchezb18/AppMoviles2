import React from "react";
import { SafeAreaView, View } from "react-native";

import AddComment from "../components/addComment";

const InfoComment = ({ navigation }) => {
  const valores = navigation.getState();
  const token = valores.routes[1].params.token;

  return (
    <SafeAreaView>
      <View>
        <AddComment navegar={navigation} token={token} />
      </View>
    </SafeAreaView>
  );
};

export default InfoComment;
