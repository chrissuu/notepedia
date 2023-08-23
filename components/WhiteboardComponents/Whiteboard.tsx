import React from "react";
import { SafeAreaView, View, useWindowDimensions } from "react-native";

import { Canvas, PaintStyle, Path, SkPaint, SkPath, Skia, StrokeCap, StrokeJoin, PathOp} from "@shopify/react-native-skia";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useWhiteboardStore, stores } from "./WhiteboardStore";
import { stroketoIndex, possibleColors, whiteboardbackgroundcolor, eraseWidthEnhancer, currentPage} from "./utility";


export type Path = { 
    path?: SkPath;
    paint?: SkPaint;
    color?: string;
}


const Whiteboard = (props) => {

    // console.log(props.id);
    // console.log(stores);

    const id = currentPage;

    
    const paths = useWhiteboardStore(id, state => state.paths);
    const setPaths = useWhiteboardStore(id, state => state.setPaths);
    const color = useWhiteboardStore(id, state => state.color);
    const stroke = useWhiteboardStore(id, state => state.stroke);
    const undoArr = useWhiteboardStore(id, state => state.undoArr);
    const setUndoArr = useWhiteboardStore(id, state => state.setUndoArr);
    const finalPath = useWhiteboardStore(id, state => state.finalPath);
    const setFinalPath = useWhiteboardStore(id, state => state.setFinalPath);
    const eraseValue = useWhiteboardStore(id, state => state.eraseValue);


    const {width} = useWindowDimensions();
    const {height} = useWindowDimensions();

    const canvasHeight = height;

    const onDrawingStart = (g) => {
        const newPaths = [...paths];
        newPaths.push({
            path: Skia.Path.Make(),
            paint: stroke.copy(),
            color: color,
        })
        newPaths[paths.length].path.moveTo(g.x, g.y);
        setPaths(newPaths);
    } 
    const onDrawingActive = (g) => {
        const newPaths = [...paths];
        newPaths[paths.length - 1].path.lineTo(g.x, g.y);
        setPaths(newPaths);
    } 
    const onDrawingFinished = () => {
        const idx = stroketoIndex(paths[paths.length - 1].color, paths[paths.length - 1].paint.getStrokeWidth());
        setFinalPath(idx, finalPath[idx][0] + paths[paths.length - 1].path.toSVGString());
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
        newPaths[paths.length].path.lineTo(g.x + 0.5, g.y + 0.5);

        const idx = stroketoIndex(paths[paths.length - 1].color, paths[paths.length - 1].paint.getStrokeWidth());
        setFinalPath(idx, finalPath[idx][0] + `M${g.x} ${g.y}` + `L${g.x + 0.5} ${g.y + 0.5}`);
        undoArr.push(newPaths[paths.length]);



        setPaths(newPaths); 
        setUndoArr([...undoArr]);
    
    }



    //touch handler
    const pan = Gesture.Pan().runOnJS(true)
        // .minDistance(1)
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
                <View style = {{backgroundColor: whiteboardbackgroundcolor, flex: 1, alignItems: 'center'}}>
                    <GestureHandlerRootView style = {{ flex: 1}}>
                        <GestureDetector gesture={composed}>
                            <View style = {{width: width - 24, elevation: 5}}>
                                <Canvas style = {{height: canvasHeight, width: width - 24, position: 'absolute'}}  >
                                    { paths.length > 0 && (
                                        finalPath.filter(function(e){return e[0] != ""}).map((fpath, i) => (
                                            <Path
                                                path = {Skia.Path.MakeFromSVGString(fpath[0])}
                                                key = {i}
                                                style = 'stroke'
                                                strokeWidth = {(Math.floor(fpath[1] / 17) + 1) * 2 * eraseWidthEnhancer[+(fpath[1] % 17 == 16)]}
                                                color = {possibleColors[fpath[1] % 17]}
                                                strokeCap = 'round'
                                                strokeMiter = {5}
                                                antiAlias = {true}
                                                strokeJoin = 'round'
                                                blendMode = 'src' // investigate this further
                                            />
                                        ))
                                    )}
                                    { paths.length > 0 && (                                            
                                            <Path 
                                                path = {paths[paths.length - 1].path} 
                                                key = {1}
                                                style = 'stroke' 
                                                strokeWidth = {paths[paths.length - 1].paint.getStrokeWidth() * eraseWidthEnhancer[+(paths[paths.length - 1].color == whiteboardbackgroundcolor)]}
                                                color = {paths[paths.length - 1].color}
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
