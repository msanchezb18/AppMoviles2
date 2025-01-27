import { StyleSheet } from "react-native";

const blueBackground = "#ADD8E6"; // Light blue
const greenBackground = "#90EE90"; // Light green

export const style_01 = StyleSheet.create({
  body: {
    margin: 7,
    padding: 5,
  },
  listItem: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  list1Item: {
    backgroundColor: blueBackground,
  },
  list2Item: {
    backgroundColor: greenBackground,
  },
});
