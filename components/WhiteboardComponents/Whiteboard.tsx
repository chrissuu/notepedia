import React, { useState } from "react";
import { SafeAreaView, View, useWindowDimensions } from "react-native";

import { Canvas, PaintStyle, Path, SkPaint, SkPath, Skia, StrokeCap, StrokeJoin } from "@shopify/react-native-skia";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import useWhiteboardStore from "./WhiteboardStore";
import Header from "./Header";
import history from "./History";


//how we store paths
export type Path = { 
    path?: SkPath;
    paint?: SkPaint;
    color?: string;
}

//creates the paint prop of Path (doesn't seem to transfer properties rn so kinda useless)
const getPaint = (strokeWidth: number, color: string) =>{
    const paint = Skia.Paint();
    paint.setStrokeWidth(strokeWidth);
    paint.setStrokeMiter(5);
    paint.setStyle(PaintStyle.Stroke);
    paint.setStrokeCap(StrokeCap.Round);
    paint.setStrokeJoin(StrokeJoin.Round);
    paint.setAntiAlias(true);

    const paintCopy = paint.copy();
    paintCopy.setColor(Skia.Color(color));
    return paintCopy;
};



const Whiteboard = (identification: number) => {

    // we use zustand library so header/history can access these (eventually all states should hopefully be there)
    const paths = useWhiteboardStore(state => state.completedPaths);
    const setPaths = useWhiteboardStore(state => state.setPaths);
    
    const [strokeWidth, setStrokeWidth] = useState<number>(4);
    const [color, setColor] = useState<string>('black');
    const {width} = useWindowDimensions();
    const [canvasHeight, setCanvasHeight] = useState(400);
    const thisID = identification;


    // note react native arrays shoudl be changed immtuably which is why we use spread notation
    const onDrawingStart = (g) => {
        const newPaths = [...paths];
        newPaths.push({
            path: Skia.Path.Make(),
            paint: getPaint(strokeWidth, color)
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
        history.push(paths[paths.length - 1]);
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
            <View style = {{backgroundColor: '#45f5f5', flex: 1, alignItems: 'center'}}>

                {/* undo redo reset */}
                <Header/> 

                <GestureHandlerRootView style = {{ flex: 1}}>
                    <GestureDetector gesture={pan}>
                        <View style = {{width: width - 24, flexGrow: 4, elevation: 1}}>
                            <Canvas style = {{height: canvasHeight, width: width - 24, position: 'absolute'}}  >
                                {paths?.map((path, i) => (  //takes all the completed paths in the "paths" array and creates them using Path from react native skia
                                    <Path 
                                        path = {path.path} 
                                        key = {i}
                                        //@ts-ignore
                                        paint={{current: path.paint}}  //a little broken rn
                                        style = 'stroke' 
                                        strokeWidth = {strokeWidth} 
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
