import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import DetallesParques from "../views/parqueDetalle";
import about from "../views/aboutView";
import galeriaView from "../views/galeriaView";
import Comment from "../views/comentarios";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={DetallesParques} />
        <Drawer.Screen name="Acerca de" component={about} />
        <Drawer.Screen name="Galeria" component={galeriaView} />
        <Drawer.Screen name="Comentarios" component={Comment} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
