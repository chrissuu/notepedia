import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

//handles light / dark mode
const RotateColor = ({rotateColor}) => {
    const handleButtonPress = () => {
      alert('Rotating color...');
      rotateColor();
    };
  
    return (
      <View style = {buttonStyles.buttonContainer}>
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