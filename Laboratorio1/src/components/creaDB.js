import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("turismo.db");

const tableName = "FavoritePlaces";

// 📌 Crear la tabla si no existe
export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        place_id TEXT NOT NULL,
        name TEXT NOT NULL,
        city TEXT NOT NULL
      );`,
      [],
      () => console.log("Tabla creada/verificada exitosamente."),
      (_, error) => console.error("Error al crear la tabla:", error)
    );
  });
};

// 📌 Insertar un lugar (máximo 5)
export const insertPlace = (place, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT COUNT(*) as count FROM ${tableName};`,
      [],
      (_, result) => {
        const count = result.rows.item(0).count;
        if (count >= 5) {
          console.warn("Límite de 5 lugares alcanzado.");
          if (callback) callback(false);
        } else {
          tx.executeSql(
            `INSERT INTO ${tableName} (place_id, name, city) VALUES (?, ?, ?);`,
            [place.place_id, place.name, place.city],
            () => {
              console.log("Lugar insertado exitosamente.");
              if (callback) callback(true);
            },
            (_, error) => console.error("Error al insertar el lugar:", error)
          );
        }
      }
    );
  });
};

// 📌 Obtener todos los lugares
export const getPlaces = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM ${tableName};`,
      [],
      (_, result) => callback(result.rows._array),
      (_, error) => console.error("Error al obtener lugares:", error)
    );
  });
};

// 📌 Eliminar un lugar
export const deletePlace = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM ${tableName} WHERE id = ?;`,
      [id],
      () => {
        console.log("Lugar eliminado.");
        if (callback) callback();
      },
      (_, error) => console.error("Error al eliminar lugar:", error)
    );
  });
};

// 📌 Eliminar todos los lugares
export const clearPlaces = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM ${tableName};`,
      [],
      () => {
        console.log("Lista de favoritos vaciada.");
        if (callback) callback();
      },
      (_, error) => console.error("Error al vaciar la lista:", error)
    );
  });
};
