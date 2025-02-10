import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // Fondo claro para mejorar la visibilidad
  },
  parqueContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff", // Fondo blanco para cada parque
    borderRadius: 10,
    shadowColor: "#000", // Sombra para dar profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra en Android
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333", // Color de texto oscuro
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "justify",
    marginVertical: 5,
    color: "#555", // Color de texto gris
  },
  bold: {
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  footerContainer: {
    backgroundColor: "#85E8E1", // Color de fondo diferente
    padding: 15,
    alignItems: "center",
    marginTop: 5,
    borderRadius: 10,
  },
  footerText: {
    color: "#ffffff", // Texto en color blanco
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default styles;
