module minerva.shapes.shape.processup {
    export interface IInput extends core.processup.IInput {
        naturalBounds: Rect;
    }
    export interface IState extends core.processup.IState {
        stretchBounds: Rect;
    }
    export interface IOutput extends core.processup.IOutput {
    }

    export class ShapeProcessUpPipeDef extends core.processup.ProcessUpPipeDef {
        constructor () {
            super();
            this.addTapinBefore('calcExtents', 'calcStretchBounds', tapins.calcStretchBounds)
                .replaceTapin('calcExtents', tapins.calcExtents);
        }
    }
}