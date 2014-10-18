/// <reference path="../../shape/measure/ShapeMeasurePipeDef" />

module minerva.shapes.ellipse.measure {
    export interface IInput extends shape.measure.IInput {
    }

    export class EllipseMeasurePipeDef extends shape.measure.ShapeMeasurePipeDef {
        constructor () {
            super();
            this.replaceTapin('calcNaturalBounds', tapins.calcNaturalBounds);
        }
    }

    export module tapins {
        export function calcNaturalBounds (input: IInput, state: shape.measure.IState, output: shape.measure.IOutput, tree: core.IUpdaterTree): boolean {
            var nb = output.naturalBounds;
            nb.x = nb.y = 0;
            if (input.stretch !== Stretch.None)
                nb.width = nb.height = 1;
            return true;
        }
    }
}