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
    return (<Drawer.Navigator 
            defaultStatus='open'
            initialRoute = 'Article' 
            screenOptions = {{
                drawerType: 'permanent'}}>
            <Drawer.Screen 
                name="Notebooks" 
                component={Whiteboard}
                options={{ header: () => <CustomHeader /> }}
            />
        </Drawer.Navigator>)
}

export default NotebookTab;