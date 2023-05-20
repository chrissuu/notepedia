import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import RotateColor from './ColorMode';
//white,dark purple, light blue
const COLORS = ['#FFFFFF', '#1E0422', '#06F7FF'];

const Whiteboard = () => {
  const [currColor, setCurrColor] = useState(0);

  function rotateColor() {
    setCurrColor((prevColor) => (prevColor + 1) % COLORS.length);
  }

  const getStyles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: COLORS[currColor],
      },
    });

  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Text > test</Text>
      <RotateColor rotateColor = {rotateColor} />
    </View>
  );
};

export default Whiteboard;
