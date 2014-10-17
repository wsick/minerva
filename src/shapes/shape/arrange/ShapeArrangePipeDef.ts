module minerva.shapes.shape.arrange {
    export interface IInput extends core.arrange.IInput {
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
    export interface IState extends core.arrange.IState {
    }
    export interface IOutput extends core.arrange.IOutput {
    }

    export class ShapeArrangePipeDef extends core.arrange.ArrangePipeDef {
        constructor () {
            super();
        }
    }
}