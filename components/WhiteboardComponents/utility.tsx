import { DrawingInfo, SkPaint, SkPath, Skia, PaintStyle, StrokeCap, StrokeJoin } from '@shopify/react-native-skia';


//paint creator
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

//current page
let initialPageName: string = "Page 1";
let currentPage = initialPageName;

const setCurrentPage = (currPage: string) => {
    currentPage = currPage;
}

//colors
const whiteboardbackgroundcolor = '#b2d8d8';
const possibleColors = ['#FFFFFF', '#C0C0C0', '#808080', '#000000',
'#FF0000', '#800000', '#FFFF00', '#808000', 
'#00FF00','#008000', '#00FFFF', '#008080', 
'#0000FF', '#000080', '#FF00FF', '#800080', '#b2d8d8'];
const possibleStrokeWidths = [2, 4, 6, 8, 10];
const colorToIdx: Record<string, number> = {
    '#FFFFFF': 0, 
    '#C0C0C0': 1, 
    '#808080': 2, 
    '#000000': 3, 
    '#FF0000': 4, 
    '#800000': 5,     
    '#FFFF00': 6, 
    '#808000': 7, 
    '#00FF00': 8, 
    '#008000': 9, 
    '#00FFFF': 10, 
    '#008080': 11, 
    '#0000FF': 12, 
    '#000080': 13,
    '#FF00FF': 14, 
    '#800080': 15,  
    '#b2d8d8': 16,
}

const eraseWidthEnhancer = [1, 5];

const stroketoIndex = (color: string, width: number) => {
    return 17 * (width/2 - 1) + colorToIdx[color];
}


export {currentPage, setCurrentPage, possibleColors, possibleStrokeWidths, stroketoIndex, whiteboardbackgroundcolor, eraseWidthEnhancer};


export default getPaint;