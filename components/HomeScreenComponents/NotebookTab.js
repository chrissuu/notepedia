import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Header from '../WhiteboardComponents/Header';
import Whiteboard from '../WhiteboardComponents/Whiteboard';
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
                header:() => <EmptyHeader />
              }}
            >
              {(props) => <Whiteboard {...props} />}
            </Drawer.Screen>

          {pageArray.map((page, index) => (
            <Drawer.Screen 
              name = {page} 
              options= {{
                header:() => <EmptyHeader />
              }}
              key = {index}
            >
              {(props) => <Whiteboard {...props} />}
            </Drawer.Screen>
          ))}

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