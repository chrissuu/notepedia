import { DrawingInfo, SkPaint, SkPath, Skia, PaintStyle, StrokeCap, StrokeJoin } from '@shopify/react-native-skia';
import { create } from 'zustand';
import getPaint from './utility';

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
