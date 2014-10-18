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
    }
    export interface IState extends core.arrange.IState {
    }
    export interface IOutput extends core.arrange.IOutput {
    }

    export class ShapeArrangePipeDef extends core.arrange.ArrangePipeDef {
        constructor () {
            super();
            this.replaceTapin('doOverride', tapins.doOverride);
        }
    }

    export module tapins {
        export function doOverride (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree) {
            var sx: number;
            var sy: number;
            var nb = input.naturalBounds;
            var fs = state.finalSize;
            switch (input.stretch) {
                case Stretch.None:
                    sx = sy = 0;
                    break;
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

            return true;
        }
    }
}