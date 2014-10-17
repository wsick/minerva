/// <reference path="../../shape/measure/ShapeMeasurePipeDef" />

module minerva.shapes.rectangle.measure {
    export interface IInput extends shape.measure.IInput {
    }

    export class RectangleMeasurePipeDef extends shape.measure.ShapeMeasurePipeDef {
        constructor () {
            super();
            this.replaceTapin('doOverride', tapins.doOverride);
        }
    }

    export module tapins {
        export function doOverride (input: IInput, state: shape.measure.IState, output: shape.measure.IOutput, tree: core.IUpdaterTree): boolean {
            var nb = output.naturalBounds;
            nb.x = nb.y = nb.width = nb.height = 0;
            Size.copyTo(state.availableSize, output.desiredSize);
            //TODO: Account for Stretch
            return true;
        }
    }
}