import React, { useRef, useState, useCallback, useEffect, useMemo} from "react";
import { useWindowDimensions, LayoutChangeEvent, View, SafeAreaView } from "react-native";

import { Skia, Canvas, TouchInfo, ExtendedTouchInfo, useDrawCallback, useTouchHandler, SkiaView, Path, SkCanvas, PaintStyle } from "@shopify/react-native-skia";
import useWhiteboardStore, { CurrentPath } from "./WhiteboardStore"; 

//white,dark purple

const Whiteboard = () => {
    const touchState = useRef(false); 
    const canvas = useRef<SkCanvas>();
    const currentPath = useRef<CurrentPath | null>();
    const {width} = useWindowDimensions();
    const completedPaths = useWhiteboardStore(state => state.completedPaths);
    const setCompletedPaths = useWhiteboardStore(state => state.setCompletedPaths);
    const stroke = useWhiteboardStore(state => state.stroke);
    const [canvasHeight, setCanvasHeight] = useState(400);

    const onDrawingActive = useCallback((TouchInfo: ExtendedTouchInfo) => {
        const {x, y} = TouchInfo;
        if (!currentPath.current) return;
        if (touchState.current){
            currentPath.current.path.lineTo(x, y);
            if (currentPath.current){
                canvas.current.drawPath(currentPath.current.path, currentPath.current.paint);
            }
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
            canvas.current?.drawPath(currentPath.current.path, currentPath.current.paint);
        }


    }, [stroke]);


    const onDraw = useDrawCallback((_canvas, info) => {
        touchHandler(info.touches);

        if (currentPath.current) {
            canvas.current?.drawPath(
              currentPath.current.path,
              currentPath.current.paint,
            );
          }
      
          if (!canvas.current) {
            useWhiteboardStore.getState().setCanvasInfo({
              width: info.width,
              height: info.height,
            });
            canvas.current = _canvas;
          }
        

    }, []);

    const onDrawingFinished = useCallback(() => {
        updatePaths();

        currentPath.current = null;
        touchState.current = false;

    }, [completedPaths.length]);  

    const updatePaths = () => {
        if (!currentPath.current) return;

        setCompletedPaths({
            path: currentPath.current.path.copy(), 
            paint: currentPath.current.paint.copy(), 
            color: useWhiteboardStore.getState().color,
        });

        console.log(currentPath.current.paint.getStrokeWidth());

        // let updatedPaths = [...completedPaths]; 
         
        // updatedPaths.push({
        //     path: currentPath.current.path.copy(), 
        //     paint: currentPath.current.paint.copy(), 
        //     color: useWhiteboardStore.getState().color,
        // });
        // // history.push(currentPath.current);

        // console.log("updated paths" + updatedPaths.length);

        // setCompletedPaths(updatedPaths);

        // console.log("completed paths" + completedPaths.length);

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
            <View style = {{flex: 1, alignItems: 'center'}}>
                <View onLayout = {onLayout} style = {{width: width - 24, flex: 1, elevation: 1}}>
                    <SkiaView onDraw = {onDraw} style = {{height: canvasHeight, width: width - 24, zIndex: 10}}/>
                    <Canvas style = {{height: canvasHeight, width: width - 24, position: 'absolute'}} >
                        {completedPaths.map(path => (
                            <Path path = {path.path} key = {path.path.toSVGString()} 
                            //@ts-ignore
                            paint={path.paint} style = 'stroke' strokeWidth={path.paint.getStrokeWidth()}/>
                        ))}

                    </Canvas>  
   
 
                </View>



            </View>

        </SafeAreaView>
    );
};


export default Whiteboard;
