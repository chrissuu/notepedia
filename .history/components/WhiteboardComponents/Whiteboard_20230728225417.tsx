import React, { useState } from "react";
import { SafeAreaView, View, useWindowDimensions } from "react-native";

import { Canvas, PaintStyle, Path, SkPaint, SkPath, Skia, StrokeCap, StrokeJoin, PathOp} from "@shopify/react-native-skia";
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
    const finalPath = useWhiteboardStore(props.id, state => state.finalPath);
    const setFinalPath = useWhiteboardStore(props.id, state => state.setFinalPath);
    // const {paths, setPaths, strokeWidth, setStrokeWidth, color, setColor, stroke} = useWhiteboardStore();


    
    const {width} = useWindowDimensions();
    const {height} = useWindowDimensions();

    const canvasHeight = height;
    // const thisID = identification;


    // note react native arrays shoudl be changed immtuably which is why we use spread notation
    const onDrawingStart = (g) => {
        const newPaths = [...paths];
        newPaths.push({
            path: Skia.Path.Make(),
            paint: stroke.copy(),
            color: color,
        })
        newPaths[paths.length].path.moveTo(g.x, g.y);
        // setFinalPath(finalPath + `M ${g.x} ${g.y}`)
        setPaths(newPaths);
    } 


    const onDrawingActive = (g) => {
        const newPaths = [...paths];
        newPaths[paths.length - 1].path.lineTo(g.x, g.y);
        // setFinalPath(finalPath + `L ${g.x} ${g.y}`)
        setPaths(newPaths);
    } 

    const onDrawingFinished = () => {
        // if (paths.length - 1 == 0){
        //     setFinalPath(paths[paths.length - 1].path);
        // }
        // else{
        //     // setFinalPath(Skia.Path.MakeFromOp(finalPath, paths[paths.length - 1].path, PathOp.Union));
            setFinalPath(finalPath + paths[paths.length - 1].path.toSVGString());
        // }
        // console.log(finalPath.toSVGString());
        undoArr.push(paths[paths.length - 1]);
        setUndoArr([...undoArr]);
    } 
    
    const onDrawTap = (g) => {
        const newPaths = [...paths];
        newPaths.push({
            path: Skia.Path.Make(),
            paint: stroke.copy(),
            color: color,
        })
        newPaths[paths.length].path.moveTo(g.x, g.y);
        newPaths[paths.length].path.lineTo(g.x + 0.1, g.y + 0.1);
        setFinalPath(finalPath + `M ${g.x} ${g.y}` + `L ${g.x + 0.1} ${g.y + 0.1}`);
        undoArr.push(newPaths[paths.length]);
        setPaths(newPaths); 
        setUndoArr([...undoArr]);

    }



    //touch handler
    const pan = Gesture.Pan().runOnJS(true)
        .minDistance(1)
        .onBegin((g) => { 'worklet'
            onDrawingStart(g);
        })
        .onUpdate((g) => { 'worklet'
            onDrawingActive(g);
        })
        .onEnd((g) => { 'worklet'
            onDrawingFinished();
        })
    const tap = Gesture.Tap().runOnJS(true)
        .onEnd((g) => { 'worklet'
            onDrawTap(g);
        })

    const composed = Gesture.Simultaneous(pan, tap);

    return (
            <SafeAreaView style = {{flex: 1}}>
                <View style = {{backgroundColor: '#b2d8d8', flex: 1, alignItems: 'center'}}>

                    
                    <GestureHandlerRootView style = {{ flex: 1}}>
                        <GestureDetector gesture={composed}>
                            <View style = {{width: width - 24, elevation: 5}}>
                                <Canvas style = {{height: canvasHeight, width: width - 24, position: 'absolute'}}  >
                                    { paths.length > 0 && (                                            
                                            <Path 
                                                path = {Skia.Path.MakeFromSVGString(finalPath)} 
                                                key = {3123}
                                                style = 'stroke' 
                                                strokeWidth = {3}
                                                color = 'black'
                                                strokeCap = 'round' //beginning/end of storkes are round
                                                strokeMiter = {5}
                                                antiAlias = {true}
                                                strokeJoin = 'round'
                                            />
                                    )}
                                    { paths.length > 0 && (                                            
                                            <Path 
                                                path = {paths[oa]} 
                                                key = {1}
                                                style = 'stroke' 
                                                strokeWidth = {3}
                                                color = 'black'
                                                strokeCap = 'round' //beginning/end of storkes are round
                                                strokeMiter = {5}
                                                antiAlias = {true}
                                                strokeJoin = 'round'
                                            />
                                    )}

                                </Canvas>  
                            </View>
                        </GestureDetector>
                    </GestureHandlerRootView>
                </View>

            </SafeAreaView>
    );
};


export default Whiteboard;
