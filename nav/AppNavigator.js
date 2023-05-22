import 'react-native-gesture-handler';
import { ThemeProvider } from '../components/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreenComponents/HomeScreen';
const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    /*
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    */
    <NavigationContainer>
      <ThemeProvider >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />

      </Stack.Navigator>
      
     
    </ThemeProvider>
    </NavigationContainer>
    
    );
}
