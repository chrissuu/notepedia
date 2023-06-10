import React, { createContext, useState, useContext } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const COLORS = ['#FFFFFF', '#1E0422', '#06F7FF'];

export const ThemeContext = createContext();

const lightTheme = {
    flex: 1,
    backgroundColor: '#FFFFFF',
    textColor: '#000000'
}

const darkTheme = {
    flex: 1,
    backgroundColor: '#000000',
    textColor: '#FFFFFF'
}

const purpleTheme = {
    flex: 1,
    backgroundColor: '#1E0422',
    textColor: '#FFFFFF'
}

export const THEMES = [lightTheme, darkTheme, purpleTheme]

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(0);

  const rotateTheme = () => {
    setTheme((prevTheme) => (prevTheme + 1) % THEMES.length);
  }

  return (
    <ThemeContext.Provider value = { {theme, rotateTheme} }>
        {children}
    </ThemeContext.Provider>
  )
}
