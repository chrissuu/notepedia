import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './nav/AppNavigator';


export default function App() {
  async function changeScreenOrientation() {

    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }
  changeScreenOrientation();
  
  return (
    <NavigationContainer >
      <AppNavigator />
    </NavigationContainer>
    
    
    );
}





