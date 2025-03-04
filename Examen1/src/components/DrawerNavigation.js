import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Home from "../views/Home";
import Detalles from "../views/DetalleLugar";
import About from "../views/aboutView";
import FavoritesScreen from "../views/FavoritesScreen"; // Nueva importación

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Inicio">
          <Drawer.Screen name="Inicio" component={Home} />
          <Drawer.Screen name="Favoritos" component={FavoritesScreen} />
          <Drawer.Screen name="Detalles" component={Detalles} />
          <Drawer.Screen name="Acerca de" component={About} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default DrawerNavigation;
