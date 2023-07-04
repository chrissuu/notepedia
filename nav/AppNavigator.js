import 'react-native-gesture-handler';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ScreenOrientation from 'expo-screen-orientation';


import { ThemeProvider } from '../theme/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../components/HomeScreenComponents/HomeScreen';
import Whiteboard from '../components/WhiteboardComponents/Whiteboard';
import NotebookTab from '../components/HomeScreenComponents/NotebookTab';




const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  
  return (
      <NotebookTab /> 
      // <Whiteboard identification = '1'/>
      
  
    );
}
