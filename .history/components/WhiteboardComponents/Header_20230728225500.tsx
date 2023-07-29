import { default as React, useState } from "react";
import { Button, StyleSheet, Text, View } from 'react-native';


import Color from "./Color";
import { useWhiteboardStore } from "./WhiteboardStore";
import Stroke from "./strokeWidth";
import getPaint from "./utility";
import { currentPage } from "./CurrentPage";


// basically the undo redo resset button as of 6/2/23
const Header = (props) => {

    const id = currentPage

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
        setFinalPath
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
        // setFinalPath(finalPath.slice(0, finalPath.length - lastPath.path.toSVGString().length));
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

    const currentColor = useWhiteboardStore(id, state => state.color);
    const currentStrokeWidth = useWhiteboardStore(id, state => state.strokeWidth);

    // stroke widths
    const setStrokeWidth = useWhiteboardStore(id, state => state.setStrokeWidth);
    const setStroke = useWhiteboardStore(id, state => state.setStroke);
    const stroke = useWhiteboardStore(id, state => state.stroke);
    const [showStrokes, setShowStrokes] = useState(false);

    const possibleStrokeWidths = [2, 4, 6, 8, 10];
    
    const onStrokeChange = (strokeWidth: number) => {
        setStrokeWidth(strokeWidth);
        setShowStrokes(false);
        setStroke(getPaint(strokeWidth, currentColor));
        // const stroke = useWhiteboardStore(id, state => state.stroke);
        // console.log(stroke.getStrokeWidth());
    }

    // colors

    const [showColors, setShowColors] = useState(false);
    const setColor = useWhiteboardStore(id, state => state.setColor);
    const possibleColors = ['#FFFFFF', '#C0C0C0', '#808080', '#000000',
                            '#FF0000', '#800000', '#FFFF00', '#808000', 
                            '#00FF00','#008000', '#00FFFF', '#008080', 
                            '#0000FF', '#000080', '#FF00FF', '#800080'];



    const onColorChange = (color: string) => {
        setColor(color);
        setShowColors(false);
        setStroke(getPaint(currentStrokeWidth, color));
    }


    //color picker
    const [showColorPicker, setShowColorPicker] = useState(false);

    const [hue, setHue] = useState(0);
    const [sat, setSat] = useState(0);
    const [val, setVal] = useState(0);

    const setSatVal = ({sat, val}) => {
        setSat(sat);
        setVal(val);
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

            {showColors && (
                <View style = {[styles.colorContainer]}>
                    <Text style = {{top: 10, left: 10, fontSize: 17}}>Basic Colors</Text>
                    <View style = {[styles.color]}>
                    {possibleColors.map(color => (
                        <Color 
                            key = {color}
                            id = {id}
                            color = {color}
                            onPress = {() => {onColorChange(color)}}
                        />
                    ))}
                    </View>
                    <View style = {{top: -10}}>
                        <Button title = "More Colors" onPress = {() => {setShowColorPicker(!false)}}/>
                    </View>
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
        width: 300, 
        borderRadius: 100, 
        flexDirection: 'row', 
        paddingHorizontal: 12, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    colorContainer: {
        top: 40,
        left: -130, 
        backgroundColor: '#ffffff', 
        height: 200, 
        width: 150, 
        borderRadius: 20,
    },
    color: {
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

