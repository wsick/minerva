module minerva.controls.grid.measure {
    export interface IInput extends panel.measure.IInput {
        gridState: IGridState;
        columnDefinitions: IColumnDefinition[];
        rowDefinitions: IRowDefinition[];
    }
    export interface IState extends panel.measure.IState {
    }

    export class GridMeasurePipeDef extends panel.measure.PanelMeasurePipeDef {
        constructor () {
            super();
            this.addTapinBefore('doOverride', 'prepareRowMatrix', tapins.prepareRowMatrix)
                .addTapinBefore('doOverride', 'prepareColMatrix', tapins.prepareColMatrix)
                .replaceTapin('doOverride', tapins.doOverride)
                .addTapinAfter('doOverride', 'saveMeasureResults', tapins.saveMeasureResults);
        }
    }
}