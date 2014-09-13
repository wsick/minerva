module minerva.def.measure {
    export interface IMeasureTapin extends ITapin {
        (assets: IAssets, state: IState, output: IOutput, availableSize: Size):boolean;
    }
    export interface IAssets extends IPipeAssets {
        previousConstraint: Size;
        visibility: Visibility;
        desiredSize: Size;
        dirtyFlags: layout.DirtyFlags;
    }
    export interface IState extends IPipeState {
    }
    export interface IOutput extends IPipeOutput {
        error: string;
        previousConstraint: Size;
        desiredSize: Size;
    }

    export class MeasurePipe extends Pipe<IMeasureTapin, IAssets, IState, IOutput> {
        constructor () {
            super();
            this.addTapin('validate', tapins.validate)
                .addTapin('validateVisibility', tapins.validateVisibility)
                .addTapin('applyTemplate', tapins.applyTemplate)
                .addTapin('checkNeedMeasure', tapins.checkNeedMeasure);
        }

        createState (): IState {
            return {
            };
        }

        createOutput (): IOutput {
            return {
                error: null,
                previousConstraint: new Size(),
                desiredSize: new Size()
            };
        }
    }
}