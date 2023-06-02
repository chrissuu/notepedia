import { DrawingInfo, SkPaint, SkPath, Skia, PaintStyle, StrokeCap, StrokeJoin } from '@shopify/react-native-skia';
import { create } from 'zustand';


export type CurrentPath = {
    path?: SkPath;
    paint?: SkPaint;
    color?: string;
}

interface WhiteboardStore {
    completedPaths: CurrentPath[];
    setPaths: (completedPaths: CurrentPath[]) => void;
    stroke: SkPaint;
    strokeWidth: number;
    color: string;
    setStrokeWidth: (strokeWidth: number) => void;
    setColor: (color: string) => void;
    setStroke: (stroke: SkPaint) => void;

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
    setPaths: newCompletedPaths => {
        set(() => ({
            completedPaths: newCompletedPaths,
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



}));

export default useWhiteboardStore;
