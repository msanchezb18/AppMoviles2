import React, { useEffect } from "react";
import DrawerNavigation from "./src/components/DrawerNavigation";
import { getConnection, createTable } from "./src/components/creaDB";

const App = () => {
  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await getConnection();
        createTable(db);
        console.log("Base de datos inicializada correctamente.");
      } catch (error) {
        console.error("Error inicializando la base de datos:", error);
      }
    };
    initDB();
  }, []);

  return <DrawerNavigation />;
};

export default App;
