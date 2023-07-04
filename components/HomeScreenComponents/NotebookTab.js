import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import React, {useState} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';


import NotebookDrawer from '../NotebookComponents/Notebook';
import Whiteboard from '../WhiteboardComponents/Whiteboard';
import Header from '../WhiteboardComponents/Header';
import { myProvider } from '../WhiteboardComponents/WhiteboardStore';
import { Button } from 'react-native';
import { StyleSheet } from 'react-native';
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
const CustomDrawerContent = ({ navigation, pages, addPages }) => {
  const handlePress = (pageName) => {
    navigation.navigate(pageName);
  };

  return (
    <ScrollView>
      {pages.map((page) => (
        <TouchableOpacity title = {page} key={page} onPress={() => handlePress(page)}>
          <Text>{page}</Text>
        </TouchableOpacity>
      ))}
      <Button title = "Add Pages" onPress ={addPages}/>
    </ScrollView>
  );
};
const NotebooksHolder = () => {
  const [pageArray, setPageArray] = useState([]);

  const addPage = () => {
    const newItem = `Page ${pageArray.length + 1}`;
    setPageArray([...pageArray, newItem]);
    console.log(newItem);
  };

  
  return (
      <Drawer.Navigator
          defaultStatus='open'
          screenOptions={{
            // drawerType: 'permanent',
            header: () => <EmptyHeader />
          }}

          drawerContent={(props) => <CustomDrawerContent {...props} pages = {pageArray} addPages = {addPage}/>}
          
        >
           <Drawer.Screen 
              name = "Default Page"
              options= {{
                header:() => <Header />
              }}
            >
              {(props) => <Whiteboard {...props} />}
            </Drawer.Screen>

          {pageArray.map((page, index) => (
            <Drawer.Screen 
              name = {page} 
              options= {{
                header:() => <Header />
              }}
              key = {index}
            >
              {(props) => <Whiteboard id = {index} {...props} />}
            </Drawer.Screen>
          ))}

      </Drawer.Navigator>
  )
}
const NotebookTab = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name = "Notebooks Screen"
        component = {NotebooksHolder}
        options={{
          header: () => <Header />
        }}
        >
       
      </Stack.Screen>

    </Stack.Navigator>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    margin: 16,
  },
});
export default NotebookTab;