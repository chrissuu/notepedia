import React, { useState, useContext } from "react";
import { Button, View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext, THEMES } from "../ThemeContext";
import Whiteboard from '../WhiteboardComponents/Whiteboard'
function NotebookScreen({ navigation, route }) {
  
  const { notebookName, uniqueID, styles } = route.params;

  return (
    <Whiteboard />
  );
}
const notebooks = [{ name: "Physics" }, { name: "Chem" }];

const Drawer = createDrawerNavigator();

const NotebookDrawer = () => {
  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    notebookContainer: {
      flex: THEMES[theme].flex,
      backgroundColor: THEMES[theme].backgroundColor,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <Drawer.Navigator>
      {notebooks.map((notebook, index) => (
        <Drawer.Screen
          key={index}
          name={notebook.name}
          component={NotebookScreen}
          initialParams={{
            notebookName: notebook.name,
            uniqueID: index,
            styles: styles,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default NotebookDrawer;
