import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import NotebookDrawer from '../NotebookComponents/Notebook';
import Whiteboard from '../WhiteboardComponents/Whiteboard';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const EmptyHeader = () => {
  return (
    null
  );
};

const Page = (props) => {
  return (
    <Drawer.Screen
      name = {props.name}
      identification = {props.identification}
      options = {{
        header: () => <EmptyHeader/>
      }}
    >
      {(props) => <Whiteboard {...props} />}
    </Drawer.Screen>
  )
}

const NotebooksHolder = () => {
  return (
    <Drawer.Navigator
          defaultStatus='open'
          screenOptions={{
            // drawerType: 'permanent',
            header: () => <EmptyHeader />
          }}
        >

          <Drawer.Screen
            name="Page 1"
            identification='1'
            options={{
              header: () => <EmptyHeader />
            }}
          >
            {(props) => <Whiteboard {...props} />}
          </Drawer.Screen>

          <Drawer.Screen
            name="Page 2"
            identification='2'
            options={{
              header: () => <EmptyHeader />
            }}
          >
            {(props) => <Whiteboard {...props} />}
          </Drawer.Screen>

        </Drawer.Navigator>
  )
}
const NotebookTab = () => {
  let whiteboard1 = <Whiteboard identification='1' />
  let whiteboard2 = <Whiteboard identification='2' />


  return (
    <Stack.Navigator>
      <Stack.Screen
        name = "Notebooks Screen"
        component = {NotebooksHolder}
        >
       
      </Stack.Screen>

    </Stack.Navigator>

  )
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