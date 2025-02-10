import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
  error: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default styles;
