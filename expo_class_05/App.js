/* call react libraries */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* custom modules */
import Home from "./src/views/home";
import InfoNote from "./src/views/infoNote";
import InfoComment from "./src/views/infoComment";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="InfoNote"
          component={InfoNote}
          options={{ title: "Note data" }}
        />
        <Stack.Screen
          name="InfoComment"
          component={InfoComment}
          options={{ title: "Add comment" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
