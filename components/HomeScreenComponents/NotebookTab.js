import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Image from 'react-native/Libraries/Image/Image';
import { Alert } from 'react-native';


import Header from '../WhiteboardComponents/Header';
import Whiteboard from '../WhiteboardComponents/Whiteboard';
import { currentPage, setCurrentPage } from '../WhiteboardComponents/utility';
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
    console.log(pageName);
    setCurrentPage(pageName);
  };

  const handleLongPress = () => {
    setIsMenuOpen(true);
  }

  const handleMenuOptionSelect = (option) => {
    console.log('selected option:', option);
    if(option === 'Rename'){ 
      let newName = Alert.prompt("Enter a new name for the page.");
      setCurrentPageName(newName);
    }
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
          onPress={() => setIsMenuOpen(false)}
          activeOpacity={1}
        >
          <View 
            style={{
              width: 200,
              left: modalPosition.left, 
              top: modalPosition.top 
            }}
          >
            <View 
              style = {styles.modalView}
            >
              <TouchableOpacity 
                onPress={() => handleMenuOptionSelect('Favorite')}
              >
                <Text>Favorite</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => handleMenuOptionSelect('Rename')}
              >
                <Text style = {styles.modalText}>Rename</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => handleMenuOptionSelect('Delete')}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
              
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};
const PagesHolder = ({navigation}) => {
  const [pageArray, setPageArray] = useState([]);

  const addPage = () => {
    const newItem = `Page ${pageArray.length + 1}`;
    setPageArray([...pageArray, newItem]);
    console.log(newItem);
    setCurrentPage(newItem);
  };

  const addInitialPage = () => {
    setPageArray([...pageArray, "Page 1"]);
    navigation.navigate("Page 1");
  }

  const {width} = useWindowDimensions();
  let iconWidth = width*0.10;

  return (
      <Drawer.Navigator
          // defaultStatus='open'
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
                    <TouchableOpacity onPress = {addInitialPage}>
                      <Image
                      source = {require('../../assets/plus.png')} 
                      style= {{width: iconWidth, height:iconWidth, tintColor:'#717c7d'}}
                      />
                    </TouchableOpacity>
                    
                    {/* <Text>
                      Add a page and get started!
                    </Text> */}
                  </View> 
                </View>
                )
              }}
          </Drawer.Screen>
          <Drawer.Screen
            name = "Page 1"
            options= {{
              header:() => <EmptyHeader />
            }}
            key = {-1}
          >
              {(props) => <Whiteboard id = {"Page 1"} {...props} />} 
          </Drawer.Screen>
          {([...pageArray].filter(function(e){return e != "Page 1"})).map((page, index) => (
            <Drawer.Screen 
              name = {page} 
              options= {{
                header:() => <EmptyHeader />
              }}
              key = {index}
              //hash by date+time? 
            >
              {(props) => <Whiteboard id = {page} {...props} />}
            </Drawer.Screen>
          ))}
      </Drawer.Navigator>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // tintColor: '#717c7d'
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
    // backgroundColor: '#f0f0f0',
    // tintColor: '#717c7d'
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


export default PagesHolder;