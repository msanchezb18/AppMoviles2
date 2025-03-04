import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // Fondo claro para mejorar la visibilidad
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333", // Color de texto oscuro
  },
  picker: {
    height: 50,
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 8,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: 20,
    marginBottom: 20,
    textAlign: "justify",
    padding: 15,
    backgroundColor: "#fff", // Fondo blanco para cada parque
    borderRadius: 10,
    shadowColor: "#000", // Sombra para dar profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra en Android
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
  favoriteButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  favoriteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
