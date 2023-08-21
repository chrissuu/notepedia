import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-navigation';
import AppNavigator from './nav/AppNavigator';
import * as Font from 'expo-font';
import { useState } from 'react';
import AppLoading from 'expo';
import LoadingScreen from './components/LoadingScreen';
import {useFonts} from 'expo-font'
import { useEffect } from 'react';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync('./assets/fonts/GloriaHallelujah-Regular.ttf');
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  // const [fontsLoaded] = useFonts({
  //   'GloriaHallelujah-Regular': require('./assets/fonts/GloriaHallelujah-Regular.ttf'),
  // });


  async function changeScreenOrientation() {

    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }
  changeScreenOrientation();
  
  return (
    <SafeAreaView 
    style = {{flex:1}}
    onLayout={onLayoutRootView}
    >
      
      <NavigationContainer>
          <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
    
    
    
    
    
    );
}





