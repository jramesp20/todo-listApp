import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

export default function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  const agregarTarea = () => {
    if (tarea.trim() === "") return;

    setTareas([...tareas, { id: Date.now().toString(), nombre: tarea }]);

    setTarea("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi Todo List</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe una tarea"
        value={tarea}
        onChangeText={setTarea}
      />

      <Button title="Agregar tarea" onPress={agregarTarea} />

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.tarea}>• {item.nombre}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  tarea: {
    fontSize: 18,
    padding: 12,
    marginTop: 8,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
});
