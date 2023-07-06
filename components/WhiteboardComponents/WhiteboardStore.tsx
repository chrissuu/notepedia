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

}



const createWhiteboardStore = () => 
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
    }));





const stores = {};

const getStore = (key: number) => {
    let store = stores[key];
    if (!store){
        store = stores[key] = createWhiteboardStore();
    }
    return store;
}

const useWhiteboardStore = <T, X>(key: number, selector?: (state: WhiteboardStore) => T) => {
    return useStore(getStore(key), selector);
} 


export {useWhiteboardStore};

// stuff shoudl look like
// <myProvider>
//   <Whiteboard>
// <myProvider>


// const MyContext = createContext<ReturnType<typeof createMyStore> | null>({} as ReturnType<typeof createMyStore>);
 

// const MyProvider = ({children} : {children: ReactNode}) => { //wraps whiteboards 
//     const store = createMyStore();
//     return <MyContext.Provider value = {store}> {children} </MyContext.Provider>;
// }

    //     const useWhiteboardStore = <T, X>(
    //         selector: (state: WhiteboardStore) => T,
    //         equals?: (a: T, b: T) => boolean,
    //     ) => {
    //         const store = useContext(MyContext);
    //         return useStore(store, selector, equals);
    //     };
    
    
// old code
 

// interface WhiteboardStore {
//     completedPaths: CurrentPath[];
//     setPaths: (completedPaths: CurrentPath[]) => void;
//     stroke: SkPaint;
//     strokeWidth: number;
//     color: string;
//     setStrokeWidth: (strokeWidth: number) => void;
//     setColor: (color: string) => void;
//     setStroke: (stroke: SkPaint) => void;
// }


// const useWhiteboardStore = create<WhiteboardStore>((set, get) => ({
//     completedPaths: [], 
//     setPaths: newCompletedPaths => {
//         set(() => ({
//             completedPaths: newCompletedPaths,
//         }));
//     },
//     strokeWidth: 3,    
//     color: 'black', 
//     stroke: getPaint(3, 'black'), 
//     setStrokeWidth: strokeWidth => {
//         set({strokeWidth});
//     },
//     setColor: color => {
//         set({color});
//     },
//     setStroke: stroke => {
//         set({stroke});
//     },



// }));
// const useWhiteboardStore = create<WhiteboardStore>((set, get) => ({
//     completedPaths: [], 
//     setPaths: newCompletedPaths => {
//         set(() => ({
//             completedPaths: newCompletedPaths,
//         }));
//     },
//     strokeWidth: 3,    
//     color: 'black', 
//     stroke: getPaint(3, 'black'), 
//     setStrokeWidth: strokeWidth => {
//         set({strokeWidth});
//     },
//     setColor: color => {
//         set({color});
//     },
//     setStroke: stroke => {
//         set({stroke});
//     },
// }));

// export default useWhiteboardStore;
