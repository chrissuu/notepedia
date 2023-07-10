import React, { useState } from "react";
import { SafeAreaView, View, useWindowDimensions } from "react-native";

import { Canvas, PaintStyle, Path, SkPaint, SkPath, Skia, StrokeCap, StrokeJoin } from "@shopify/react-native-skia";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useWhiteboardStore } from "./WhiteboardStore";
import Header from "./Header";
// import history from "./History";


//how we store paths
export type Path = { 
    path?: SkPath;
    paint?: SkPaint;
    color?: string;
}


//chagne stuff
const Whiteboard = (props) => {

    // we use zustand library so header/history can access these (eventually all states should hopefully be there)
    const paths = useWhiteboardStore(props.id, state => state.paths);
    const setPaths = useWhiteboardStore(props.id, state => state.setPaths);
    const strokeWidth = useWhiteboardStore(props.id, state => state.strokeWidth);
    const setStrokeWidth = useWhiteboardStore(props.id, state => state.setStrokeWidth)
    const color = useWhiteboardStore(props.id, state => state.color);
    const setColor = useWhiteboardStore(props.id, state => state.setColor);
    const stroke = useWhiteboardStore(props.id, state => state.stroke);
    const undoArr = useWhiteboardStore(props.id, state => state.undoArr);
    const setUndoArr = useWhiteboardStore(props.id, state => state.setUndoArr);

    // const {paths, setPaths, strokeWidth, setStrokeWidth, color, setColor, stroke} = useWhiteboardStore();


    
    const {width} = useWindowDimensions();
    const [canvasHeight, setCanvasHeight] = useState(400);
    // const thisID = identification;


    // note react native arrays shoudl be changed immtuably which is why we use spread notation
    const onDrawingStart = (g) => {
        const newPaths = [...paths];
        newPaths.push({
            path: Skia.Path.Make(),
            paint: stroke.copy(),
            color: color,
        })
        console.log(color);
        newPaths[paths.length].path.moveTo(g.x, g.y);
        setPaths(newPaths);
    } 

    const onDrawingActive = (g) => {
        const newPaths = [...paths];
        newPaths[paths.length - 1].path.lineTo(g.x, g.y);
        setPaths(newPaths);
    } 

    const onDrawingFinished = () => {
        undoArr.push(paths[paths.length - 1]);
        setUndoArr([...undoArr]);
    } 
    



    //touch handler
    const pan = Gesture.Pan().runOnJS(true)
        .onStart((g) => { 'worklet'
            onDrawingStart(g);
        })
        .onUpdate((g) => { 'worklet'
            onDrawingActive(g);
        })
        .onEnd((g) => { 'worklet'
            onDrawingFinished();
        })

    return (
            <SafeAreaView style = {{flex: 1}}>
                <View style = {{backgroundColor: '#b2d8d8', flex: 1, alignItems: 'center'}}>

                    
                    <GestureHandlerRootView style = {{ flex: 1}}>
                        <GestureDetector gesture={pan}>
                            <View style = {{width: width - 24, flexGrow: 4, elevation: 1}}>
                                <Canvas style = {{height: canvasHeight, width: width - 24, position: 'absolute'}}  >
                                    {paths?.map((path, i) => (  //takes all the completed paths in the "paths" array and creates them using Path from react native skia
                                        <Path 
                                            path = {path.path} 
                                            key = {i}
                                            //@ts-ignore
                                            // paint={path.paint}  //a little broken rn
                                            style = 'stroke' 
                                            strokeWidth = {path.paint.getStrokeWidth()} 
                                            color = {path.color}
                                            strokeCap = 'round' //beginning/end of storkes are round
                                            strokeMiter = {5}
                                            antiAlias = {true}
                                            strokeJoin = 'round'
                                        />
                                    ))}

                                </Canvas>  
                            </View>
                        </GestureDetector>
                    </GestureHandlerRootView>
                </View>

            </SafeAreaView>
    );
};


export default Whiteboard;
