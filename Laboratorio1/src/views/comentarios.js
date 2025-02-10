import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const CommentsScreen = () => {
  const [parques, setParques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParques = async () => {
      try {
        const response = await axios.get("http://192.168.100.35:5005/parque");
        console.log("Respuesta del servidor:", response.data); // Depuración
        setParques(response.data.data);
      } catch (err) {
        console.error("Error en la solicitud:", err); // Depuración
        setError("Error al cargar los parques");
      } finally {
        setLoading(false);
      }
    };

    fetchParques();
  }, []);

  const handleAddComment = async (parqueId) => {
    const newCommentData = {
      comentario: newComment,
      autor: "Usuario",
      fecha: new Date().toISOString(),
    };

    try {
      await axios.post(
        `http://192.168.100.35:5005/parque/${parqueId}/comentario`,
        newCommentData
      );
      setNewComment("");
      const response = await axios.get("http://192.168.100.35:5005/parque");
      setParques(response.data.data);
    } catch (err) {
      setError("Error al agregar comentario");
      console.error(err);
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>{item.comentario}</Text>
      <Text style={styles.commentAuthor}>- {item.autor}</Text>
      <Text style={styles.commentDate}>
        {new Date(item.fecha).toLocaleString()}
      </Text>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentarios sobre Parques Nacionales</Text>

      {parques.map((parque) => (
        <View key={parque._id}>
          <Text style={styles.parqueTitle}>{parque.nombre}</Text>
          <FlatList
            data={parque.comentarios}
            renderItem={renderComment}
            keyExtractor={(item, index) => index.toString()}
            style={styles.commentList}
          />

          <TextInput
            style={styles.input}
            placeholder="Agregar un comentario..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <Button
            title="Agregar comentario"
            onPress={() => handleAddComment(parque._id)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  parqueTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  commentList: {
    marginBottom: 20,
  },
  commentContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  commentAuthor: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
  },
  commentDate: {
    fontSize: 12,
    color: "#555",
    textAlign: "right",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default CommentsScreen;
