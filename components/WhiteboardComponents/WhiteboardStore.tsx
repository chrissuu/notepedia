import { DrawingInfo, SkPaint, SkPath, Skia, PaintStyle, StrokeCap, StrokeJoin } from '@shopify/react-native-skia';
import { create } from 'zustand';


export type CurrentPath = {
    path: SkPath;
    paint: SkPaint;
    color?: string;
}

interface WhiteboardStore {
    completedPaths: CurrentPath[];
    addPath: (CPath: CurrentPath) => void;
    removePath: () => void;
    clearPaths: () => void;
    stroke: SkPaint;
    strokeWidth: number;
    color: string;
    setStrokeWidth: (strokeWidth: number) => void;
    setColor: (color: string) => void;
    setStroke: (stroke: SkPaint) => void;
    canvasInfo: Partial<DrawingInfo> | null;
    setCanvasInfo: (canvasInfo: Partial<DrawingInfo> ) => void;


}



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

    // console.log(paintCopy);
    return paintCopy;
};


const useWhiteboardStore = create<WhiteboardStore>((set, get) => ({
    completedPaths: [], 
    addPath: Path => {
        // console.log(completedPaths.length);
        set((state) => ({
            completedPaths: [
                ...state.completedPaths, Path
            ]
        }));
    },
    removePath: () => {
        set((state) => ({
            completedPaths: [...state.completedPaths.slice(0, -1)]
        }));
        // set((state) => ({
        //     completedPaths: state.completedPaths.filter((_, i) => {
        //         i == -1
        //     })
        // }));
    },
    clearPaths: () => {
        set((state) => ({
            completedPaths: [],
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
    canvasInfo: null,
    setCanvasInfo: canvasInfo => {
        set({canvasInfo});
    },




}));

export default useWhiteboardStore;
