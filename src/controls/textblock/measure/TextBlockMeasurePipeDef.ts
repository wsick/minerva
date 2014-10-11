module minerva.controls.textblock.measure {
    export interface IInput extends core.measure.IInput {
        lineStackingStrategy: LineStackingStrategy;
        lineHeight: number;
        textAlignment: TextAlignment;
        textTrimming: TextTrimming;
        textWrapping: TextWrapping;
        font: Font;
    }

    export class TextBlockMeasurePipeDef extends core.measure.MeasurePipeDef {
        constructor () {
            super();
        }
    }
}