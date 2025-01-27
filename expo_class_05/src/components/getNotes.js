import React, { useEffect, useState } from "react";
import { PATHURL, PORT } from "./config/config";
import { style_01 } from "../styles/style_01";

import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";

const GetNotes = (props) => {
  const nav = props.navegar;
  const [data, setData] = useState([]);

  const Obtener = async () => {
    try {
      axios.get(`${PATHURL}:${PORT}/article`).then((response) => {
        const json = response.data;
        setData(json.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Obtener();
  }, []);

  const onPressViewArticle = (token) => {
    nav.navigate("InfoNote", { token: token });
  };

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.title}
            style={style_01.itemText}
            onPress={() => onPressViewArticle(item._id)}
          >
            <View>
              <Text style={style_01.tit_02}>{item.title}</Text>
              <Text style={style_01.author}>{item.author}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default GetNotes;
