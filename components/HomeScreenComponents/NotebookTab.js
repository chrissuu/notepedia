import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import  Image from 'react-native/Libraries/Image/Image';
import { useRef } from 'react';
import { Modal } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { Button, StyleSheet } from 'react-native';
import Header from '../WhiteboardComponents/Header';
import Whiteboard from '../WhiteboardComponents/Whiteboard';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export let currentPage = 'Page 0';

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

// const DefaultPage = (props) => {
//   return (
//     <Drawer.Screen
//       name = {props.name}
//       identification = {props.identification}
//       options = {{
//         header: () => <EmptyHeader/>
//       }}
//     >
//       {(props) => {
//         <View>
//           <Image 
//             source = {require('../../assets/add-page.png')} 
//             style={{ width: 2000, height: 2000 }}
//           />
//           <Text>
//             Add a page and get started!
//           </Text>
//         </View>
//       }}
//     </Drawer.Screen>
//   )
// }

const CustomDrawerContent = ({ navigation, pages, addPages }) => {
  const [currentPageName, setCurrentPageName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);

  const handlePress = (pageName) => {
    navigation.navigate(pageName);
    currentPage = pageName;
    console.log(currentPage);
  };

  const handleLongPress = () => {
    setIsMenuOpen(true);
  }

  const handleMenuOptionSelect = (option) => {
    console.log('selected option:', option);
    setIsMenuOpen(false);
  }

  const calculateModalPosition = () => {
    buttonRef.current.measure((x,y,width,height,pageX,pageY) => {
      setModalPosition({left: pageX, top: pageY + height});
    });
  }

  const [modalPosition, setModalPosition] = useState({left:0, top:0});

  return (
    <ScrollView>
      {pages.map((page) => (
        <TouchableOpacity 
          title = {page} 
          key={page} 
          onPress={() => handlePress(page)}
          onLongPress={handleLongPress}
        >
          <View ref = {buttonRef}>
            <Text>{currentPage === page ? currentPage : page}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <Button title = "Add Pages" onPress ={addPages}/>

      <Modal 
        visible={isMenuOpen} 
        transparent ={true}
        onShow={calculateModalPosition}
      >
        <TouchableOpacity 
          style={styles.modalContainer} 
          onPress={() => setIsMenuOpen(false)}
        >
          <View style={[styles.menuContainer, { left: modalPosition.left, top: modalPosition.top }]}>
            <View style = {styles.modalView}>
              <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuOptionSelect('Rename')}>
                <Text style = {styles.modalText}>Rename</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuOptionSelect('Delete')}>
                <Text>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuOptionSelect('Favorite')}>
                <Text>Favorite</Text>
              </TouchableOpacity>
            </View>
              
          </View>
        </TouchableOpacity>
      </Modal>
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

  const {width} = useWindowDimensions();
  let iconWidth = width*0.2;

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
            name = "Default page"
            options = {{
              header: () => <EmptyHeader/>
            }}
          >
              {(props) => {
                return (
                <View style = {styles.container}>
                  <View style = {styles.centeredView}>
                    <Image 
                      source = {require('../../assets/add-page.png')} 
                      style= {{width: iconWidth, height:iconWidth}}
                    />
                    <Text>
                      Add a page and get started!
                    </Text>
                  </View>
                
                </View>
                )
              }}
          </Drawer.Screen>

          {pageArray.map((page, index) => (
            <Drawer.Screen 
              name = {page} 
              options= {{
                header:() => <EmptyHeader />
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
          header: () => <Header/>
        }}
        >
       
      </Stack.Screen>

    </Stack.Navigator>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    margin: 16,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: '20%',
    backgroundColor: '#f0f0f0',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default NotebookTab;