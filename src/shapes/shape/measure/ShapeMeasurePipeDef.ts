module minerva.shapes.shape.measure {
    export interface IInput extends core.measure.IInput, IShapeProperties {
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
            this.addTapinBefore('doOverride', 'calcNaturalBounds', tapins.calcNaturalBounds)
                .replaceTapin('doOverride', tapins.doOverride);
        }

        createOutput () {
            var output = <IOutput>super.createOutput();
            output.naturalBounds = new Rect();
            return output;
        }

        prepare (input: IInput, state: IState, output: IOutput) {
            Rect.copyTo(input.naturalBounds, output.naturalBounds);
            super.prepare(input, state, output);
        }

        flush (input: IInput, state: IState, output: IOutput) {
            super.flush(input, state, output);
            Rect.copyTo(output.naturalBounds, input.naturalBounds);
        }
    }

    export module tapins {
        export function calcNaturalBounds (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree) {
            var nb = output.naturalBounds;
            nb.x = nb.y = 0;
            nb.width = nb.height = 1;
            return true;
        }

        export function doOverride (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree) {
            var ds = output.desiredSize;
            ds.width = ds.height = 0;
            return true;
        }
    }
}