import 'react-native-gesture-handler';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';


import { ThemeProvider } from '../theme/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../components/HomeScreenComponents/HomeScreen';
import Whiteboard from '../components/WhiteboardComponents/Whiteboard';
import NotebookTab from '../components/HomeScreenComponents/NotebookTab';
import PagesHolder from '../components/HomeScreenComponents/NotebookTab';
import Header from '../components/WhiteboardComponents/Header';
import LoadingScreen from '../components/LoadingScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  
  return (
    <Stack.Navigator 
      initialRouteName="Loading"
   
    >
      <Stack.Screen
        name = "Notebooks Screen"
        component = {PagesHolder}
        options={{
          header: () => <Header/>,
          animationEnabled:false
        }}
      />  
      <Stack.Screen
        name ="Loading"
        component = {LoadingScreen}
        options={{ 
          headerShown: false,
          animationEnabled:false 
        }} 
      />
      <Stack.Screen
        name = "Graphs Screen"
        component = {HomeScreen}
      />

    </Stack.Navigator>
      // <Whiteboard identification = '1'/>
      
  
    );
}
