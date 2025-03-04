import * as SQLite from "expo-sqlite";

export const getConnection = () => {
  return new Promise((resolve) => {
    const db = SQLite.openDatabaseSync("turismo.db");
    resolve(db);
  });
};

const tableName = "FavoritePlaces";

// 📌 Crear la tabla si no existe
export const createTable = async (db) => {
  await db.transactionAsync(async (tx) => {
    await tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS FavoritePlaces (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        place_id TEXT NOT NULL,
        name TEXT NOT NULL,
        city TEXT NOT NULL
      );`
    );
    console.log("Tabla creada/verificada exitosamente.");
  });
};

// 📌 Insertar un lugar (máximo 5)
export const insertPlace = async (db, place, callback) => {
  await db.transactionAsync(async (tx) => {
    const result = await tx.executeSqlAsync(
      `SELECT COUNT(*) as count FROM ${tableName};`
    );
    const count = result.rows[0].count;

    if (count >= 5) {
      console.warn("Límite de 5 lugares alcanzado.");
      if (callback) callback(false);
    } else {
      await tx.executeSqlAsync(
        `INSERT INTO ${tableName} (place_id, name, city) VALUES (?, ?, ?);`,
        [place.place_id, place.name, place.city]
      );
      console.log("Lugar insertado exitosamente.");
      if (callback) callback(true);
    }
  });
};

// 📌 Obtener todos los lugares
export const getPlaces = async (
  db: { (places: any): void; transactionAsync?: any },
  callback: (arg0: any) => void
) => {
  await db.transactionAsync(
    async (tx: { executeSqlAsync: (arg0: string) => any }) => {
      const result = await tx.executeSqlAsync(`SELECT * FROM ${tableName};`);
      callback(result.rows);
    }
  );
};

// 📌 Eliminar un lugar
export const deletePlace = async (
  db: { transactionAsync: (arg0: (tx: any) => Promise<void>) => any },
  id: () => void,
  callback: () => void
) => {
  await db.transactionAsync(async (tx) => {
    await tx.executeSqlAsync(`DELETE FROM ${tableName} WHERE id = ?;`, [id]);
    console.log("Lugar eliminado.");
    if (callback) callback();
  });
};

// 📌 Eliminar todos los lugares
export const clearPlaces = async (
  db: { (): void; transactionAsync?: any },
  callback: () => void
) => {
  await db.transactionAsync(
    async (tx: { executeSqlAsync: (arg0: string) => any }) => {
      await tx.executeSqlAsync(`DELETE FROM ${tableName};`);
      console.log("Lista de favoritos vaciada.");
      if (callback) callback();
    }
  );
};
