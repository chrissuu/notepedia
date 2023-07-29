import { DrawingInfo, SkPaint, SkPath, Skia, PaintStyle, StrokeCap, StrokeJoin } from '@shopify/react-native-skia';



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

let initialPageName: string = "Page 1";
let currentPage = initialPageName;

const setCurrentPage = (currPage: string) => {
    currentPage = currPage;
}


export {currentPage, setCurrentPage};


export default getPaint;