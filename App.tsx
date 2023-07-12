import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-navigation';
import AppNavigator from './nav/AppNavigator';


export default function App() {
  async function changeScreenOrientation() {

    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }
  changeScreenOrientation();
  
  return (
    <SafeAreaView style = {{flex:1}}>
      <NavigationContainer>
          <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
    
    
    
    
    
    );
}





