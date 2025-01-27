import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { style_01 } from "../styles/style_01";
import GetNotes from "../components/getNotes";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text style={style_01.tit_01}>Express Notes</Text>
        <GetNotes navegar={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
