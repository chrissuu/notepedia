import { Button, View, StyleSheet } from "react-native";
import { createDrawerNavigation } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
function Notebook({ navigation, notebookName, uniqueID }) {
  return (
    <View style={styles.notebookContainer}>
      <Button
        onPress={() => navigation.navigate(`${uniqueID}`)}
        title="Go to notifications"
      />
    </View>
  );
}
const notebooks = [{ name: "Physics" }, { name: "Chem" }];

const Drawer = createDrawerNavigation();

const NotebookDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {notebooks.map((notebook, index) => (
          <Drawer.Screen
            key={index}
            name={notebook.name}
            component={() => (
              <Notebook notebookName={notebook.name} uniqueID={index} />
            )}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  notebookContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NotebookDrawer;
