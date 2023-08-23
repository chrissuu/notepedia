import { default as React, useState } from "react";
import { Button, StyleSheet, Text, View } from 'react-native';


import Color from "./Color";
import { useWhiteboardStore } from "./WhiteboardStore";
import Stroke from "./strokeWidth";
import getPaint, {currentPage, possibleColors, possibleStrokeWidths, stroketoIndex, whiteboardbackgroundcolor} from "./utility";


// basically the undo redo resset button as of 6/2/23
const Header = (props) => {

    const id = currentPage; // header and whitebaord refer to different stores

    const undoArr = useWhiteboardStore(id, state => state.undoArr);
    const redoArr = useWhiteboardStore(id, state => state.redoArr);
    const setUndoArr = useWhiteboardStore(id, state => state.setUndoArr);
    const setRedoArr = useWhiteboardStore(id, state => state.setRedoArr);
    const setPaths = useWhiteboardStore(id, state => state.setPaths);
    const finalPath = useWhiteboardStore(id, state => state.finalPath);
    const setFinalPath = useWhiteboardStore(id, state => state.setFinalPath);
    
    const clear = () => {
        setUndoArr([]);
        setRedoArr([]);
        setPaths([]);
        for(let i = 0; i < 85; i++){
            setFinalPath(i, "");
        }
        setEraseValue(false);

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
        const idx = stroketoIndex(lastPath.color,lastPath.paint.getStrokeWidth());
        setFinalPath(idx, finalPath[idx][0].slice(0, -1 * lastPath.path.toSVGString().length));
        setEraseValue(false);

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
        const idx = stroketoIndex(lastPath.color,lastPath.paint.getStrokeWidth());
        setFinalPath(idx, finalPath[idx][0] + lastPath.path.toSVGString());
        setEraseValue(false);

    }

    const currentColor = useWhiteboardStore(id, state => state.color);
    const currentStrokeWidth = useWhiteboardStore(id, state => state.strokeWidth);

    // stroke widths
    const setStrokeWidth = useWhiteboardStore(id, state => state.setStrokeWidth);
    const setStroke = useWhiteboardStore(id, state => state.setStroke);
    const stroke = useWhiteboardStore(id, state => state.stroke);
    const [showStrokes, setShowStrokes] = useState(false);
    
    const onStrokeChange = (strokeWidth: number) => {
        setStrokeWidth(strokeWidth);
        setShowStrokes(false);
        setStroke(getPaint(strokeWidth, currentColor));
        setEraseValue(false);

    }

    // colors
    const [showColors, setShowColors] = useState(false);
    const setColor = useWhiteboardStore(id, state => state.setColor);
    const onColorChange = (color: string) => {
        setColor(color);
        setShowColors(false);
        setStroke(getPaint(currentStrokeWidth, color));
        setEraseValue(false);
    }

    const eraseValue = useWhiteboardStore(id, state => state.eraseValue);
    const setEraseValue = useWhiteboardStore(id, state => state.setEraseValue);
    const onEraseChange = () => {
        setColor(whiteboardbackgroundcolor);
        setStroke(getPaint(currentStrokeWidth, whiteboardbackgroundcolor));
        if (eraseValue == true){
            setColor('#000000');
            setStroke(getPaint(currentStrokeWidth, '#000000'));
        }
        setEraseValue(!eraseValue);
    }

    



    return (
        <View style = {styles.container}>
            <Button title = "Undo" onPress = {undo}/>
            <Button title = "Redo" onPress = {redo}/>
            <Button title = "Clear" onPress = {clear}/>

            {/* stroke width */}
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
                            id = {id}
                            stroke = {strokeWidth} 
                            onPress = {() => {onStrokeChange(strokeWidth)}}
                        />
                    ))}
                    </View>
            )}

            <Stroke stroke = {5} id = {id} onPress = {() => {setShowStrokes(!showStrokes); setShowColors(false)}}></Stroke>

            {/* colors */}
            <Button title = "Colors" onPress = {() => {setShowColors(!showColors); setShowStrokes(false)}}/>
            <Button title = "Eraser" onPress = {() => {onEraseChange()}}/>

            {showColors && (
                <View 
                style = {[
                    styles.color, 
                    {
                        top: 40, 
                        left: 200,
                        position: 'absolute',
                    }
                ]}>
                    {possibleColors.filter(function(e){return e != whiteboardbackgroundcolor}).map(color => (
                        <Color 
                            key = {color}
                            id = {id}
                            color = {color}
                            onPress = {() => {onColorChange(color)}}
                        />
                    ))}
                </View>
            )}



        </View>

    );
};

// change these teo percentages at some point
const styles = StyleSheet.create({
    
    container: {
        height: 50,
        flexgrow: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#cfcfcf',
    },
    strokeWidth: {
        backgroundColor: '#ffffff', 
        height: 50, 
        width: 200, 
        borderRadius: 100, 
        flexDirection: 'row', 
        paddingHorizontal: 12, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    color: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        height: 150,
        width: 150,
        flexDirection: 'column-reverse', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '4%',
        
    },
  });

export default Header;

