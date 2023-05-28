import 'react-native-gesture-handler';
import { ThemeProvider } from '../components/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreenComponents/HomeScreen';
import Whiteboard from '../components/WhiteboardComponents/Whiteboard';


const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
      <Whiteboard/> 
    );
}
