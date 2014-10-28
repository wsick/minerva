module minerva.controls.virtualizingstackpanel.measure {
    export interface IInput extends panel.measure.IInput {
        scrollData: IScrollData;
    }

    export class VirtualizingStackPanelMeasurePipeDef extends panel.measure.PanelMeasurePipeDef {
        constructor () {
            super();
        }
    }
}