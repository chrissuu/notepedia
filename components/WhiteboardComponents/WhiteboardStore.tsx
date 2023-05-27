import { DrawingInfo, Paint, SkPaint, Path, SkPath, Skia } from '@shopify/react-native-skia';
import { create} from 'zustand';


export type CurrentPath = {
    path: SkPath;
    paint: SkPaint;
    color: string;
}

interface WhiteboardStore {
    completedPaths: CurrentPath[];
    setCompletedPaths: (completedPaths: CurrentPath[]) => void;
    strokeWidth: number;
    color: string;
    stroke: SkPaint;
    setStrokeWidth: (strokeWidth: number) => void;
    setColor: (color: string) => void;
    setStroke: (stroke: SkPaint) => void;
    canvasInfo: Partial<DrawingInfo> | null;
    setCanvasInfo: (canvasInfo: Partial<DrawingInfo> ) => void;


}



const getPaint = (strokeWidth: number, color: string) =>{
    const paint = Skia.Paint();
    paint.setStrokeWidth(strokeWidth);
    const paintCopy = paint.copy();
    paintCopy.setColor(Skia.Color(color));
    console.log(paintCopy);
    return paintCopy;
};


const useWhiteboardStore = create<WhiteboardStore>((set, get) => ({
    completedPaths: [], 
    setCompletedPaths: completedPaths => {
        set({completedPaths});
    },
    strokeWidth: 2, 
    color: 'black', 
    stroke: getPaint(2, 'black'),
    setStrokeWidth: strokeWidth => {
        set({strokeWidth});
    },
    setColor: color => {
        set({color});
    },
    setStroke: stroke => {
        set({stroke});
    },
    canvasInfo: null,
    setCanvasInfo: canvasInfo => {
        set({canvasInfo});
    },




}));

export default useWhiteboardStore;
