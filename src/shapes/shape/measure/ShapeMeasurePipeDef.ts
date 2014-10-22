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
            var sx: number;
            var sy: number;
            var nb = output.naturalBounds;
            var as = state.availableSize;
            switch (input.stretch) {
                case Stretch.None:
                    sx = sy = 0;
                    break;
                default:
                case Stretch.Fill:
                    sx = as.width / nb.width;
                    sy = as.height / nb.height;
                    break;
                case Stretch.Uniform:
                    sx = sy = Math.min(as.width / nb.width, as.height / nb.height);
                    break;
                case Stretch.UniformToFill:
                    sx = sy = Math.max(as.width / nb.width, as.height / nb.height);
                    break;
            }

            var ds = output.desiredSize;
            ds.width = (nb.width * sx) || 0;
            ds.height = (nb.height * sy) || 0;

            if (!isFinite(ds.width))
                ds.width = 0;
            if (!isFinite(ds.height))
                ds.height = 0;

            return true;
        }
    }
}