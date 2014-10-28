module minerva.controls.virtualizingstackpanel.arrange {
    export interface IInput extends panel.arrange.IInput {
        scrollData: IScrollData;
    }

    export class VirtualizingStackPanelArrangePipeDef extends panel.arrange.PanelArrangePipeDef {
        constructor () {
            super();
        }
    }
}