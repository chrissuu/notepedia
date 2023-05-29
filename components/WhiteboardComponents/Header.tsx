import React from "react";
import {Text, View, Button, StyleSheet} from 'react-native';


import history from './history'
import useWhiteboardStore from "./WhiteboardStore";


const Header = () => {

    const reset = () => {
        useWhiteboardStore.getState().clearPaths();
        history.clear();
    }

    const undo = () => {
        history.undo();
    }

    const redo = () => {
        history.redo();
    }



    return (
        <View style = {styles.container}>
            <Button title = "Undo" onPress = {undo}/>
            <Button title = "Redo" onPress = {redo}/>
            <Button title = "Reset" onPress = {reset}/>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
      height: 50,
      flexgrow: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });

export default Header;