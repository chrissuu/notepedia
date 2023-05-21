import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Whiteboard from './components/WhiteboardComponents/Whiteboard';
import RotateColor from './components/WhiteboardComponents/ColorMode'
import { ThemeProvider } from './components/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import NotebookDrawer from './components/NotebookComponents/Notebook';
export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider >
     
      
      <RotateColor />
      <NotebookDrawer>
        <Whiteboard />
      </NotebookDrawer>
     
    </ThemeProvider>
    </NavigationContainer>
    
    );
}
