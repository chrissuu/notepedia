import { ReactNode, createContext, useContext } from 'react';
import { DrawingInfo, SkPaint, SkPath, Skia, PaintStyle, StrokeCap, StrokeJoin } from '@shopify/react-native-skia';
import {  createStore, useStore } from 'zustand';

import getPaint from './utility';
import { Path } from './Whiteboard';

export type CurrentPath = { //how paths are stored
    path?: SkPath;
    paint?: SkPaint;
    color?: string;
}
 
interface WhiteboardStore { //whiteboard props
    paths: CurrentPath[];
    setPaths: (completedPaths: CurrentPath[]) => void;
    stroke: SkPaint;
    strokeWidth: number;
    color: string;
    setStrokeWidth: (strokeWidth: number) => void;
    setColor: (color: string) => void;
    setStroke: (stroke: SkPaint) => void;
    undoArr: Path[];
    setUndoArr: (newUndoArr: Path[]) => void;
    redoArr: Path[];    
    setRedoArr: (newUndoArr: Path[]) => void;
    finalPath: string;
    setFinalPath: (finalPath: string) => void;


}



const createWhiteboardStore = 
    createStore<WhiteboardStore>((set, get) => ({
        paths: [], 
        setPaths: newCompletedPaths => {
            set(() => ({
                paths: newCompletedPaths,
            }));
        },
        strokeWidth: 3,    
        color: 'black', 
        stroke: getPaint(3, 'black'), 
        setStrokeWidth: strokeWidth => {
            set({strokeWidth});
        },
        setColor: color => {
            set({color});
        },
        setStroke: stroke => {
            set({stroke});
        },
        undoArr: [], 
        setUndoArr: newUndoArr => {
            set(() => ({
                undoArr: newUndoArr,
            }));
        },
        redoArr: [],
        setRedoArr: newRedoArr => {
            set(() => ({
                redoArr: newRedoArr,
            }));
        },
        // finalPath: SkPath, 
        // setFinalPath: newFinalPath => {
        //     set({newFInalPath});
        // }
        finalPath: "",
        setFinalPath: finalPath => {
            set({finalPath});
        }
    }));


const stores = {};


const getStore = (key: string) => {
    let store = stores[key];
    if (!store){
        store = stores[key] = createWhiteboardStore;
    }
    return store;
}

const useWhiteboardStore = <T, X>(key: string, selector?: (state: WhiteboardStore) => T) => {
    return useStore(getStore(key), selector);
} 


export {useWhiteboardStore, stores};

