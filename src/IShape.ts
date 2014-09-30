module minerva {
    export interface IShape {
        stretch: Stretch;
        fill: IBrush;
        fillRule: FillRule;
        stroke: IBrush;
        strokeThickness: number;
        strokeStartLineCap: PenLineCap;
        strokeEndLineCap: PenLineCap;
        strokeLineJoin: PenLineJoin;
        strokeMiterLimit: number;

        actualWidth: number;
        actualHeight: number;

        draw(ctx: layout.render.RenderContext): IShape;
        doFill(ctx: layout.render.RenderContext, region: Rect): IShape;
        doStroke(ctx: layout.render.RenderContext, region: Rect): IShape;
    }
}