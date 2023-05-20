import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Whiteboard from './components/WhiteboardComponents/Whiteboard';
import RotateColor from './components/WhiteboardComponents/ColorMode'
import { ThemeProvider } from './components/ThemeContext';
export default function App() {
  return (
    <ThemeProvider >
     
         <Whiteboard />
      <RotateColor />
      
     
    </ThemeProvider>
    );
}
