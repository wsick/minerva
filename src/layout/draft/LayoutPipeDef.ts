module minerva.layout.draft {
    export interface ILayoutTapin extends pipe.ITapin {
        (data: ILayoutPipeData): boolean;
    }
    export interface ILayoutPipeData extends pipe.IPipeData {
        updater: Updater;
        assets: IUpdaterAssets;
        flag: UIFlags;
        measureList: Updater[];
        arrangeList: Updater[];
        sizingList: Updater[];
        surfaceSize: Size;
    }
    export class LayoutPipeDef extends pipe.PipeDef<ILayoutTapin, ILayoutPipeData> {
        constructor () {
            super();
            this.addTapin('flushPrevious', tapins.flushPrevious)
                .addTapin('determinePhase', tapins.determinePhase)
                .addTapin('prepareMeasure', tapins.prepareMeasure)
                .addTapin('measure', tapins.measure)
                .addTapin('prepareArrange', tapins.prepareArrange)
                .addTapin('arrange', tapins.arrange)
                .addTapin('prepareSizing', tapins.prepareSizing)
                .addTapin('sizing', tapins.sizing);
        }

        prepare (data: ILayoutPipeData) {
        }

        flush (data: ILayoutPipeData) {
        }
    }
}