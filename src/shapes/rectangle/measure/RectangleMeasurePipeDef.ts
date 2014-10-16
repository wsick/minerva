/// <reference path="../../shape/measure/ShapeMeasurePipeDef" />

module minerva.shapes.rectangle.measure {
    export interface IInput extends shape.measure.IInput {
        radiusX: number;
        radiusY: number;
    }

    export class RectangleMeasurePipeDef extends shape.measure.ShapeMeasurePipeDef {
        constructor () {
            super();
        }
    }
}