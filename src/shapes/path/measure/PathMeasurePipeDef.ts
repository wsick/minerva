/// <reference path="../../shape/measure/ShapeMeasurePipeDef" />

module minerva.shapes.path.measure {
    export interface IInput extends shape.measure.IInput {
        data: IPathGeometry;
    }
    export interface IState extends shape.measure.IState {
    }
    export interface IOutput extends shape.measure.IOutput {
    }

    export class PathMeasurePipeDef extends shape.measure.ShapeMeasurePipeDef {
        constructor () {
            super();
            this.replaceTapin('calcNaturalBounds', tapins.calcNaturalBounds);
        }
    }

    export module tapins {
        export function calcNaturalBounds (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree) {
            var nb = output.naturalBounds;
            nb.x = nb.y = nb.width = nb.height = 0;
            if (input.data) {
                var bounds = input.data.GetBounds(input);
                Rect.copyTo(bounds, nb);
            }

            return true;
        }
    }
}