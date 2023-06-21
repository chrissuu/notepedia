import React from "react";
import { Button, StyleSheet, View } from 'react-native';
import history from './History';
import useWhiteboardStore from "./WhiteboardStore";
import Stroke from "./strokeWidth";
import getPaint from "./utility";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

// basically the undo redo resset button as of 6/2/23
const Header = () => {


    const clear = () => {
        history.clear();
        useWhiteboardStore.getState().setPaths([]);
        //reset canvas 
    }

    const undo = () => {
        history.undo();
    }

    const redo = () => {
        history.redo();
    }


    const setStrokeWidth = useWhiteboardStore(state => state.setStrokeWidth);
    const setStroke = useWhiteboardStore(state => state.setStroke);
    const currentColor = useWhiteboardStore(state => state.color);
    const [showStrokes, setShowStrokes] = useState(false);

    const possibleStrokeWidths = [2, 4, 6, 8, 10];
    
    const onStrokeChange = (strokeWidth: number) => {
        setStrokeWidth(strokeWidth);
        setStroke(getPaint(strokeWidth, currentColor));
    }





    return (
        <View style = {styles.container}>
            <Button title = "Undo" onPress = {undo}/>
            <Button title = "Redo" onPress = {redo}/>
            <Button title = "Clear" onPress = {clear}/>

            {showStrokes && (
                
                    <View 
                    style = {[
                        styles.strokeWidth, 
                        {
                            top: 40, 
                        position: 'absolute',
                        },
                    ]}>
                    {possibleStrokeWidths.map(strokeWidth => (
                        <Stroke 
                            key = {strokeWidth} 
                            stroke = {strokeWidth} 
                            onPress = {() => {onStrokeChange(strokeWidth); console.log("Pressed");}}
                        />
                    ))}
                </View>
              
               

            )}

            <Stroke stroke = {5} onPress = {() => {setShowStrokes(!showStrokes); console.log("Pressed")}}></Stroke>
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
    strokeWidth: {
        backgroundColor: '#ffffff', 
        height: 50, 
        width: 300, 
        borderRadius: 100, 
        flexDirection: 'row', 
        paddingHorizontal: 12, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
  });

export default Header;

