module minerva.shapes.shape.sizing {
    export interface IInput extends core.sizing.IInput {
        naturalBounds: Rect;
        stretch: Stretch;
    }
    export interface IState extends core.sizing.IState {
        shouldStretch: boolean;
    }
    export interface IOutput extends core.sizing.IOutput {
    }

    export class ShapeSizingPipeDef extends core.sizing.SizingPipeDef {
        constructor () {
            super();
            this.addTapinAfter('computeActual', 'calcShouldStretch', tapins.calcShouldStretch)
                .addTapinAfter('calcShouldStretch', 'stretchActual', tapins.stretchActual);
        }

        createState (): IState {
            var state = <IState>super.createState();
            state.shouldStretch = false;
            return state;
        }
    }
}