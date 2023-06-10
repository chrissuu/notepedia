import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import NotebookDrawer from '../NotebookComponents/Notebook';
import Whiteboard from '../WhiteboardComponents/Whiteboard';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Drawer = createDrawerNavigator();

const CustomHeader = () => {
    return (
        <View>
            <Text>Custom Header</Text>
        </View>
    );
};

const NotebookTab = () => {
    let whiteboard1 = <Whiteboard identification = '1'/>
    let whiteboard2 = <Whiteboard identification = '2'/>


    return (
        <Drawer.Navigator 
            defaultStatus='open'
            screenOptions = {{
                drawerType: 'permanent'}}>
        
            <Drawer.Screen 
            name = "Chem notebook" 
            identification = '1' 
            options={{ header: () => <CustomHeader /> }} 
            >
                {(props) => <Whiteboard {...props} />}
            </Drawer.Screen>

            <Drawer.Screen 
            name = "Physics notebook" 
            identification = '2' 
            options={{ header: () => <CustomHeader /> }} 
            >
                {(props) => <Whiteboard {...props} />}
            </Drawer.Screen>

        </Drawer.Navigator>)
}

const PhysicsNotebookScreen = () => {
    return (
        <View><Tab.Navigator>
        <Tab.Screen
          name="Whiteboard 1"
          component={() => <Whiteboard identification='1' />}
        />
      </Tab.Navigator></View>
      
    );
  };
  
  const ChemistryNotebookScreen = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Whiteboard 2"
          component={() => <Whiteboard identification='2' />}
        />
      </Tab.Navigator>
    );
  };
export default NotebookTab;