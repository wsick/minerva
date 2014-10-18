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
            nb.x = nb.y = nb.width = nb.height = 0;
            return true;
        }

        export function doOverride (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree) {
            if (input.stretch === Stretch.None) {
                Size.copyTo(output.naturalBounds, output.desiredSize);
                return true;
            }

            var factor: number;
            var nb = output.naturalBounds;
            var as = state.availableSize;
            switch (input.stretch) {
                default:
                case Stretch.Fill:
                    factor = 1;
                    break;
                case Stretch.Uniform:
                    factor = Math.min(as.width / nb.width, as.height / nb.height);
                    break;
                case Stretch.UniformToFill:
                    factor = Math.max(as.width / nb.width, as.height / nb.height);
                    break;
            }

            var ds = output.desiredSize;
            ds.width = (nb.width * factor) || 0;
            ds.height = (nb.height * factor) || 0;

            return true;
        }
    }
}