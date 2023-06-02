import AppNavigator from './nav/AppNavigator';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
  async function changeScreenOrientation() {

    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }
  changeScreenOrientation();
  return (
    <AppNavigator />
    
    );
}

