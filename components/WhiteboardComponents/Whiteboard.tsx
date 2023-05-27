import React, { useRef, useState, useContext, useCallback} from "react";
import { useWindowDimensions, LayoutChangeEvent, View, SafeAreaView } from "react-native";

import { Skia, Canvas, TouchInfo, ExtendedTouchInfo, useDrawCallback, useTouchHandler, SkiaView, Path } from "@shopify/react-native-skia";
import useWhiteboardStore, { CurrentPath } from "./WhiteboardStore"; 

//white,dark purple

const Whiteboard = () => {
    const touchState = useRef(false); 
    const canvas = useRef();
    const currentPath = useRef();
    const {width} = useWindowDimensions();
    const completedPaths = useWhiteboardStore(state => state.completedPaths);
    const setCompletedPaths = useWhiteboardStore(state => state.setCompletedPaths)
    const stroke = useWhiteboardStore(state => state.stroke)
    const [canvasHeight, setCanvasHeight] = useState(400);

    const onDrawingActive = useCallback((TouchInfo: ExtendedTouchInfo) => {
        const {x, y} = TouchInfo;
        if (!currentPath.current) return;
        if (touchState.current){
            currentPath.lineTo(x, y);
            canvas.current.drawPath(currentPath.current.Path, currentPath.current.paint);
        }

    }, []);

    const onDrawingStart = useCallback((TouchInfo: ExtendedTouchInfo) => {
        if (currentPath.current) return;

        const {x, y} = TouchInfo;
        currentPath.current = { //make new path
            path: Skia.Path.Make(),
            paint: stroke.copy(),
        }
        touchState.current = true;
        currentPath.current.path.moveTo(x, y);

        if (currentPath.current){
            canvas.current.drawPath(currentPath.current.path, currentPath.current.paint);
        }


    }, [stroke]);

    const onDrawingFinished = useCallback(() => {
        updatePaths();

        touchState.current = false;
        currentPath.current = null;

    }, [completedPaths.length]);

    const onDraw = useDrawCallback((_canvas, info) => {
        touchHandler(info.touches);
        
        

    }, []);

    const updatePaths = () => {
        let updatedPaths = [...completedPaths];

        updatedPaths.push({
            path: currentPath.current.path.copy(), 
            paint: currentPath.current.paint.copy(), 
            color: currentPath.current.color.copy(),
        })

        setCompletedPaths(updatedPaths);
    };  

    const touchHandler = useTouchHandler({
        onActive: onDrawingActive, 
        onStart: onDrawingStart, 
        onEnd: onDrawingFinished,
    });

    const onLayout = (event) => {
        setCanvasHeight(event.nativeEvent.layout.height);
    }

    return (
        <SafeAreaView style = {{flex: 1}}>
            <View style = {{width: width - 24, flex: 1, alignItems: 'center'}}>
                <View onLayout = {onLayout} style = {{width: width - 24, flexgrow: 1}}>
                    <SkiaView onDraw = {onDraw} style = {{height: canvasHeight, width: width - 24, zIndex: 10}}/>
                    <Canvas style = {{height: canvasHeight, width: width - 24, position: 'absolute'}} >
                        {completedPaths.map(path => (
                            <Path path = {path.path} paint={path.paint}/>
                        ))}

                    </Canvas>

                    
                </View>



            </View>

        </SafeAreaView>
    );
};


export default Whiteboard;
