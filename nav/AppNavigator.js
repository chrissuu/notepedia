import 'react-native-gesture-handler';
import { ThemeProvider } from '../theme/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreenComponents/HomeScreen';
import Whiteboard from '../components/WhiteboardComponents/Whiteboard';
import NotebookTab from '../components/HomeScreenComponents/NotebookTab';

import * as ScreenOrientation from 'expo-screen-orientation';


const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  
  return (
      <NotebookTab /> 
      // <Whiteboard identification = '1'/>
      
  
    );
}
