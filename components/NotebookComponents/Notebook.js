import React, { useState, useContext, useCallback } from "react";
import { Button, View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext, THEMES } from "../../theme/ThemeContext";
import Whiteboard from '../WhiteboardComponents/Whiteboard'

function NotebookScreen({ navigation, route }) {
  const { notebookName, uniqueID, styles } = route.params;

  return (
    <Whiteboard />
  );
}

const notebooks = [
  { name: "Physics", uniqueID: 0 },
  { name: "Chemistry", uniqueID: 1 },
];

const Drawer = createDrawerNavigator();

const NotebookDrawer = () => {
  const { theme } = useContext(ThemeContext);
  const [notebooksState, setNotebooksState] = useState(notebooks);

  const styles = StyleSheet.create({
    notebookContainer: {
      flex: THEMES[theme].flex,
      backgroundColor: THEMES[theme].backgroundColor,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const handleDrawerLongPress = useCallback((index) => {
    const newNotebooks = [...notebooksState];
    const newNotebookName = prompt("Enter a new name for the drawer:");
    if (newNotebookName) {
      newNotebooks[index].name = newNotebookName;
      setNotebooksState(newNotebooks);
    }
  }, [notebooksState]);

  return (
    <Drawer.Navigator>
      {notebooksState.map((notebook, index) => (
        <Drawer.Screen
          key={index}
          name={notebook.name}
          component={NotebookScreen}
          initialParams={{
            notebookName: notebook.name,
            uniqueID: notebook.uniqueID,
            styles: styles,
          }}
          listeners={{
            longPress: () => handleDrawerLongPress(index),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default NotebookDrawer;