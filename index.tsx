/*
  IMPORTACIONES
  useState: permite guardar datos que pueden cambiar en la pantalla.
  View: contenedor para organizar elementos.
  Text: muestra texto.
  TextInput: permite escribir.
  Pressable: crea elementos que responden al tocarse.
  FlatList: muestra listas de manera eficiente.
  StyleSheet: organiza los estilos visuales.
*/

import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";


type Task = {
  id: string;
  title: string;
  completed: boolean;
};


export default function HomeScreen() {
  

  const [taskText, setTaskText] = useState("");


  const [tasks, setTasks] = useState<Task[]>([]);

  /*
    FUNCIÓN: AGREGAR UNA TAREA

    Se ejecuta cuando el usuario presiona Agregar
    o confirma la escritura desde el teclado.
  */

  function addTask() {
    // trim() elimina espacios al principio y al final.
    const title = taskText.trim();

    // Si no hay texto, termina la función sin agregar nada.
    if (title.length === 0) return;

    /*
      Creamos un objeto con la información de la tarea.

      Date.now() obtiene la fecha y hora actual en milisegundos.
      toString() convierte ese número en una cadena.
      completed comienza en false porque está pendiente.
    */

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };


    setTasks((currentTasks) => [...currentTasks, newTask]);

    setTaskText("");
  }


  function toggleTask(id: string) {
    // map() recorre todas las tareas y devuelve un arreglo nuevo.
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
       
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  /*
    FUNCIÓN: ELIMINAR UNA TAREA

    Recibe el id de la tarea que queremos eliminar.
  */

  function deleteTask(id: string) {
    /*
      filter() crea un arreglo nuevo conservando
      únicamente las tareas cuyo id sea diferente.

      La tarea seleccionada queda fuera de la lista.
    */

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  /*
    INTERFAZ VISUAL (JSX)

    return indica qué elementos debe mostrar la pantalla.
    Los componentes se organizan dentro de View.
  */

  return (
    <View style={styles.container}>
      {/* Título principal de la pantalla */}
      <Text style={styles.title}>Mis tareas</Text>

      {/* Texto secundario debajo del título */}
      <Text style={styles.subtitle}>Organiza tu día, una tarea a la vez.</Text>

      {/* FORMULARIO PARA AGREGAR TAREAS */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          // Texto que aparece cuando el campo está vacío.
          placeholder="Escribe una tarea..."
          /*
            value conecta el campo con el estado taskText.
            onChangeText actualiza el estado al escribir.
          */
          value={taskText}
          onChangeText={setTaskText}
          // Ejecuta addTask al confirmar desde el teclado.
          onSubmitEditing={addTask}
          // Cambia la tecla del teclado a "done".
          returnKeyType="done"
        />

        {/* Botón para agregar la tarea */}
        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </Pressable>
      </View>

      {/* LISTA DE TAREAS */}
      <FlatList
        // Arreglo que contiene los elementos de la lista.
        data={tasks}
        /*
          Identifica cada elemento mediante su id.
          React Native lo utiliza para reconocer las tareas.
        */
        keyExtractor={(item) => item.id}
        // Estilos del contenedor de la lista.
        contentContainerStyle={styles.list}
        /*
          Componente que se muestra cuando tasks está vacío.
          Al agregar tareas, deja de mostrarse.
        */
        ListEmptyComponent={
          <Text style={styles.empty}>Todavía no tienes tareas.</Text>
        }
        /*
          renderItem define cómo se dibuja cada tarea.
          item representa la tarea actual de la lista.
        */
        renderItem={({ item }) => (
          <View style={styles.task}>
            {/* Área que permite marcar la tarea */}
            <Pressable
              style={styles.taskContent}
              // Al tocarla, cambia su estado.
              onPress={() => toggleTask(item.id)}
            >
              {/* Casilla visual: marcada o sin marcar */}
              <Text style={styles.check}>{item.completed ? "☑" : "☐"}</Text>

              <Text
                /*
                  styles.taskText siempre se aplica.
                  styles.completed se añade si está completada.
                  Los corchetes permiten combinar varios estilos.
                */
                style={[styles.taskText, item.completed && styles.completed]}
              >
                {/* Nombre de la tarea actual */}
                {item.title}
              </Text>
            </Pressable>

            {/* Botón para eliminar la tarea actual */}
            <Pressable onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>Eliminar</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

/*
  ESTILOS DE LA APLICACIÓN

  StyleSheet.create() organiza los estilos visuales.
  Cada propiedad define la apariencia de un componente.
*/

const styles = StyleSheet.create({
  // Contenedor de toda la pantalla.
  container: {
    flex: 1, // Ocupa todo el espacio disponible.
    backgroundColor: "#F5F7FB", // Fondo gris claro.
    paddingTop: 70, // Espacio superior.
    paddingHorizontal: 20, // Margen horizontal.
  },

  // Estilo del título principal.
  title: {
    fontSize: 30, // Tamaño de letra.
    fontWeight: "bold", // Texto en negrita.
    color: "#172554", // Color azul oscuro.
  },

  // Estilo del subtítulo.
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 8, // Separación superior.
    marginBottom: 24, // Separación inferior.
  },

  // Organiza el campo de texto y el botón en una fila.
  form: {
    flexDirection: "row",
    gap: 8, // Separación entre elementos.
    marginBottom: 20,
  },

  // Estilo del campo para escribir.
  input: {
    flex: 1, // Ocupa el espacio libre de la fila.
    backgroundColor: "#FFFFFF",
    borderRadius: 10, // Esquinas redondeadas.
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1, // Grosor del borde.
    borderColor: "#E2E8F0",
  },

  // Estilo del botón Agregar.
  addButton: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: "center", // Centra verticalmente el contenido.
  },

  // Texto del botón Agregar.
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  // Espacio al final de la lista para facilitar el desplazamiento.
  list: {
    paddingBottom: 30,
  },

  // Mensaje cuando no existen tareas.
  empty: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 30,
  },

  // Contenedor individual de cada tarea.
  task: {
    flexDirection: "row", // Contenido y botón en una fila.
    alignItems: "center", // Alineación vertical.
    justifyContent: "space-between", // Separa ambos extremos.
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10, // Separación entre tareas.
  },

  // Contenedor de la casilla y el texto de la tarea.
  taskContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  // Apariencia de la casilla de la tarea.
  check: {
    fontSize: 23,
    color: "#2563EB",
  },

  // Apariencia del nombre de la tarea.
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#1E293B",
  },

  // Estilo adicional para tareas completadas.
  completed: {
    textDecorationLine: "line-through", // Tacha el texto.
    color: "#94A3B8", // Cambia a gris.
  },

  // Apariencia del texto Eliminar.
  delete: {
    color: "#DC2626", // Rojo.
    marginLeft: 10,
    fontSize: 13,
  },
});

