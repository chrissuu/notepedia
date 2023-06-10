import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import {ThemeContext, ThemeProvider, THEMES} from './ThemeContext';

//handles light / dark mode
const RotateColor = () => {
    const {rotateTheme} = useContext(ThemeContext);
    const { theme } = useContext(ThemeContext);
    const handleButtonPress = () => {
      alert('Rotating color...');
      rotateTheme();
    };
  
    return (
      <View style = {{backgroundColor: THEMES[theme].backgroundColor}}>
        <TouchableOpacity style = {buttonStyles.button} onPress = {handleButtonPress}>
          <Text style= {buttonStyles.buttonText}>Rotate Color</Text>
        </TouchableOpacity>
      </View>
    )
}

const buttonStyles = StyleSheet.create({
    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold'
    },
  });
export default RotateColor;