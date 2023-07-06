import React from "react";
import { Button, StyleSheet, View } from 'react-native';
import { useState } from "react";


import { useWhiteboardStore } from "./WhiteboardStore";
import Stroke from "./strokeWidth";
import getPaint from "./utility";
import { currentPage } from "../HomeScreenComponents/NotebookTab";

// basically the undo redo resset button as of 6/2/23
const Header = (props) => {

    // const id = Number((props.id).slice(5));
    const id = Number(currentPage.slice(5)) - 1;
    const undoArr = useWhiteboardStore(id, state => state.undoArr);
    const redoArr = useWhiteboardStore(id, state => state.redoArr);
    const setUndoArr = useWhiteboardStore(id, state => state.setUndoArr);
    const setRedoArr = useWhiteboardStore(id, state => state.setRedoArr);
    const setPaths = useWhiteboardStore(id, state => state.setPaths);

    const clear = () => {
        console.log(id);
        setUndoArr([]);
        setRedoArr([]);
        setPaths([]);
        //reset canvas 
    }

    const undo = () => {
        if (undoArr.length == 0){
            return;
        }
        let lastPath = undoArr.pop();
        setUndoArr([...undoArr]);
        redoArr.push(lastPath);
        setRedoArr([...redoArr]);
        setPaths([...undoArr]);
    }

    const redo = () => {
        if (redoArr.length == 0){
            return;
        }
        let lastPath = redoArr.pop();
        setRedoArr([...redoArr]);
        undoArr.push(lastPath);
        setUndoArr([...undoArr]);
        setPaths([...undoArr]);
    }



    const setStrokeWidth = useWhiteboardStore(id, state => state.setStrokeWidth);
    const setStroke = useWhiteboardStore(id, state => state.setStroke);
    const currentColor = useWhiteboardStore(id, state => state.color);
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

