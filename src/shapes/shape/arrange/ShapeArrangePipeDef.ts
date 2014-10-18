module minerva.shapes.shape.arrange {
    export interface IInput extends core.arrange.IInput {
        stretch: Stretch;
        fill: IBrush;
        fillRule: FillRule;
        stroke: IBrush;
        strokeThickness: number;
        strokeStartLineCap: PenLineCap;
        strokeEndLineCap: PenLineCap;
        strokeLineJoin: PenLineJoin;
        strokeMiterLimit: number;

        naturalBounds: Rect;
        stretchXform: number[];
    }
    export interface IState extends core.arrange.IState {
    }
    export interface IOutput extends core.arrange.IOutput {
        stretchXform: number[];
    }

    export class ShapeArrangePipeDef extends core.arrange.ArrangePipeDef {
        constructor () {
            super();
            this.replaceTapin('doOverride', tapins.doOverride);
        }

        prepare (input: IInput, state: IState, output: IOutput) {
            mat3.set(input.stretchXform, output.stretchXform);
            super.prepare(input, state, output);
        }

        flush (input: IInput, state: IState, output: IOutput) {
            super.flush(input, state, output);
            mat3.set(output.stretchXform, input.stretchXform);
        }
    }

    export module tapins {
        export function doOverride (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree) {
            if (input.stretch === Stretch.None) {
                Size.copyTo(input.naturalBounds, state.arrangedSize);
                return true;
            }

            var sx: number;
            var sy: number;
            var nb = input.naturalBounds;
            var fs = state.finalSize;
            switch (input.stretch) {
                default:
                case Stretch.Fill:
                    sx = fs.width / nb.width;
                    sy = fs.height / nb.height;
                    break;
                case Stretch.Uniform:
                    sx = sy = Math.min(fs.width / nb.width, fs.height / nb.height);
                    break;
                case Stretch.UniformToFill:
                    sx = sy = Math.max(fs.width / nb.width, fs.height / nb.height);
                    break;
            }


            var as = state.arrangedSize;
            as.width = (nb.width * sx) || 0;
            as.height = (nb.height * sy) || 0;

            mat3.createScale(sx, sy, output.stretchXform);

            return true;
        }
    }
}