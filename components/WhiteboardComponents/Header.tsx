import React from "react";
import { Button, StyleSheet, View } from 'react-native';
import { useState } from "react";


import history from './History';
import { useWhiteboardStore } from "./WhiteboardStore";
import Stroke from "./strokeWidth";
import getPaint from "./utility";

// basically the undo redo resset button as of 6/2/23
const Header = (props) => {
    const clear = () => {
        history.clear();
        const setPaths = useWhiteboardStore(props.id, state => state.setPaths);
        setPaths([]);
        //reset canvas 
    }

    const undo = () => {
        history.undo();
    }

    const redo = () => {
        history.redo();
    }


    const setStrokeWidth = useWhiteboardStore(props.id, state => state.setStrokeWidth);
    const setStroke = useWhiteboardStore(props.id, state => state.setStroke);
    const currentColor = useWhiteboardStore(props.id, state => state.color);
    const [showStrokes, setShowStrokes] = useState(false);

    const possibleStrokeWidths = [2, 4, 6, 8, 10];
    
    const onStrokeChange = (strokeWidth: number) => {
        setStrokeWidth(strokeWidth);
        setShowStrokes(false);
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
                            id = {props.id}
                            stroke = {strokeWidth} 
                            onPress = {() => {onStrokeChange(strokeWidth); console.log("Pressed");}}
                        />
                    ))}
                </View>
              
               

            )}

            <Stroke stroke = {5} id = {props.id} onPress = {() => {setShowStrokes(!showStrokes); console.log("Pressed")}}></Stroke>
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

