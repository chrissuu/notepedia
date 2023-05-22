import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import NotebookDrawer from '../NotebookComponents/Notebook';
import Whiteboard from '../WhiteboardComponents/Whiteboard';

const CustomHeader = () => {
  return (
    <View>
      <Text>Custom Header</Text>
    </View>
  );
};
const Drawer = createDrawerNavigator();
const HomeScreen = () => {
    return (
        <Drawer.Navigator 
            defaultStatus='open'
            initialRoute = 'Article' 
            screenOptions = {{
                drawerType: 'permanent'}}>
            <Drawer.Screen 
                name="Notebooks" 
                component={NotebookDrawer} 
                options={{ header: () => <CustomHeader /> }}
            />
            <Drawer.Screen 
                name="Graphs" 
                component={Whiteboard}
                options={{ header: () => <CustomHeader /> }}
            />
        </Drawer.Navigator>
    );
};

export default HomeScreen;