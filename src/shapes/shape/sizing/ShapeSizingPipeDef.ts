module minerva.shapes.shape.sizing {
    export interface IInput extends layout.sizing.IInput {
        naturalBounds: Rect;
        stretch: Stretch;
    }
    export interface IState extends layout.sizing.IState {
        shouldStretch: boolean;
    }
    export interface IOutput extends layout.sizing.IOutput {
    }

    export class ShapeSizingPipeDef extends layout.sizing.SizingPipeDef {
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