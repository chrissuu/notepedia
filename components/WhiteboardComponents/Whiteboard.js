import React, { useState, useContext } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { ThemeContext, THEMES } from "../ThemeContext";
import RotateColor from "./ColorMode";
//white,dark purple

const Whiteboard = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: THEMES[theme]?.backgroundColor }}>
      <Text style={{ color: THEMES[theme]?.textColor }}> test</Text>
    </View>
  );
};

export default Whiteboard;
