module minerva.shapes.shape.measure {
    export interface IInput extends core.measure.IInput {
        fill: IBrush;
        fillRule: FillRule;
        stroke: IBrush;
        strokeThickness: number;
        strokeStartLineCap: PenLineCap;
        strokeEndLineCap: PenLineCap;
        strokeLineJoin: PenLineJoin;
        strokeMiterLimit: number;

        naturalBounds: Rect;
    }
    export interface IState extends core.measure.IState {
    }
    export interface IOutput extends core.measure.IOutput {
        naturalBounds: Rect;
    }

    export class ShapeMeasurePipeDef extends core.measure.MeasurePipeDef {
        constructor () {
            super();
        }

        createOutput () {
            var output = <IOutput>super.createOutput();
            output.naturalBounds = new Rect();
            return output;
        }
    }
}