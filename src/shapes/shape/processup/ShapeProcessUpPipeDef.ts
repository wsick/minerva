module minerva.shapes.shape.processup {
    export interface IInput extends core.processup.IInput {
        stretch: Stretch;
        stroke: IBrush;
        strokeThickness: number;

        naturalBounds: Rect;
        shapeFlags: ShapeFlags;
    }
    export interface IState extends core.processup.IState {
        stretchBounds: Rect;
    }
    export interface IOutput extends core.processup.IOutput {
        shapeFlags: ShapeFlags;
    }

    export class ShapeProcessUpPipeDef extends core.processup.ProcessUpPipeDef {
        constructor () {
            super();
            this.addTapinBefore('calcExtents', 'calcStretchBounds', tapins.calcStretchBounds)
                .replaceTapin('calcExtents', tapins.calcExtents);
        }

        createState () {
            var state = <IState>super.createState();
            state.stretchBounds = new Rect();
            return state;
        }

        createOutput () {
            var output = <IOutput>super.createOutput();
            output.shapeFlags = ShapeFlags.None;
            return output;
        }

        prepare (input: IInput, state: IState, output: IOutput) {
            output.shapeFlags = input.shapeFlags;
            super.prepare(input, state, output);
        }

        flush (input: IInput, state: IState, output: IOutput) {
            super.flush(input, state, output);
            input.shapeFlags = output.shapeFlags;
        }
    }
}