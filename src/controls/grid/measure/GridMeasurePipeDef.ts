module minerva.controls.grid.measure {
    export interface IInput extends panel.measure.IInput {
        gridState: IGridState;
        columnDefinitions: IColumnDefinition[];
        rowDefinitions: IRowDefinition[];
    }
    export interface IState extends panel.measure.IState {
        totalStars: Size;
    }

    export class GridMeasurePipeDef extends panel.measure.PanelMeasurePipeDef {
        constructor () {
            super();
            this.addTapinBefore('doOverride', 'ensureRowMatrix', tapins.ensureRowMatrix)
                .addTapinBefore('doOverride', 'prepareRowMatrix', tapins.prepareRowMatrix)
                .addTapinBefore('doOverride', 'ensureColMatrix', tapins.ensureColMatrix)
                .addTapinBefore('doOverride', 'prepareColMatrix', tapins.prepareColMatrix)
                .replaceTapin('doOverride', tapins.doOverride)
                .addTapinAfter('doOverride', 'saveMeasureResults', tapins.saveMeasureResults);
        }

        createState () {
            var state = <IState>super.createState();
            state.totalStars = new Size();
            return state;
        }
    }
}