import { createDrawerNavigator } from '@react-navigation/drawer';
import { GraphTab } from './GraphTab';
import { NotebookTab } from './NotebookTab';
import { View, Text } from 'react';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => {
    return (
    <Tab.Navigator>
        <Tab.Screen name="Notebooks" component={GraphTab} />
        <Tab.Screen name="Graphs" component={NotebookTab} />
    </Tab.Navigator>);
}

const MyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name = "Stack"
                component = {TabNavigator}
                options = {{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    );
}
const HomeScreen = () => {
    return (
        //     <Drawer.Navigator
        //     defaultStatus='open'
        //     initialRoute='Article'
        //     screenOptions={{
        //         drawerType: 'permanent'
        //     }}>
        //     <Drawer.Screen
        //         name="Notebooks"
        //         component={MyStack}
                
        //     />


        // </Drawer.Navigator>
        <TabNavigator />
        
    );
};

export default HomeScreen;