import { DrawingInfo, SkPaint, SkPath, Skia, PaintStyle, StrokeCap, StrokeJoin } from '@shopify/react-native-skia';


const getPaint = (strokeWidth: number, color: string) =>{
    const paint = Skia.Paint();
    paint.setStrokeWidth(strokeWidth);
    paint.setStrokeMiter(5);
    paint.setStyle(PaintStyle.Stroke);
    paint.setStrokeCap(StrokeCap.Round);
    paint.setStrokeJoin(StrokeJoin.Round);
    paint.setAntiAlias(true);
    paint.setColor(Skia.Color(color));

    // const paintCopy = paint.copy();
    // paintCopy.setColor(Skia.Color(color));
    console.log("a");
    console.log(paint.getColor());
    console.log("B");
    // console.log(paintCopy);
    return paint;
};


export default getPaint;