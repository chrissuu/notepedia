// LoadingScreen.js
import React from 'react';
import { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';
import { useFonts } from 'expo-font/build/FontHooks';
import * as Font from 'expo-font';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#258c78', // Customize the background color
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  customFontText: {
    fontFamily: 'GloriaHallelujah-Regular', // Use the font family name defined in the font linking configuration
    fontSize: 20,
  },
});

const LoadingScreen = () => {
    // const [fontLoaded, setFontLoaded] = useState(false);
    // const [fontsLoaded] = useFonts({
    //     'GloriaHallelujah-Regular': require('../assets/fonts/GloriaHallelujah-Regular.ttf'),
    //   });
    // useEffect(() => {
    //   async function loadFont() {
    //     await Font.loadAsync({
    //       'GloriaHallelujah-Regular': require('../assets/fonts/GloriaHallelujah-Regular.ttf'),
    //     });
    //     setFontLoaded(true);
    //   }
  
    //   loadFont();
    // }, []);
    let navigation = useNavigation();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Notebooks Screen'); // Navigate to the main screen
        }, 1000); // Wait for 1 second before navigating
    
        return () => clearTimeout(timer); // Clean up timer on unmount
    }, [navigation]);

    // if (!fontLoaded) {
    //   return null; // Return null or a loading indicator while the font is loading
    // } else {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/image1.png')} style={styles.logo} />
        <Text style ={{ fontFamily: 'GloriaHallelujah-Regular', fontSize: 30 }}>notepedia</Text>
      </View>
    );
    // }
  
    
    
    
  };
export default LoadingScreen;