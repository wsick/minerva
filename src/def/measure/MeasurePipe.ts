module minerva.def.measure {
    export interface IMeasureTapin extends ITapin {
        (assets: IAssets, state: IState, output: IOutput, availableSize: Size):boolean;
    }
    export interface IAssets extends IPipeAssets {
        width: number;
        height: number;
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
        useLayoutRounding: boolean;
        margin: Thickness;
        previousConstraint: Size;
        visibility: Visibility;
        desiredSize: Size;
        dirtyFlags: layout.DirtyFlags;
    }
    export interface IState extends IPipeState {
        availableSize: Size;
    }
    export interface IOutput extends IPipeOutput {
        error: string;
        previousConstraint: Size;
        desiredSize: Size;
        hiddenDesire: Size;
        dirtyFlags: layout.DirtyFlags;
    }

    export class MeasurePipe extends Pipe<IMeasureTapin, IAssets, IState, IOutput> {
        constructor () {
            super();
            this.addTapin('validate', tapins.validate)
                .addTapin('validateVisibility', tapins.validateVisibility)
                .addTapin('applyTemplate', tapins.applyTemplate)
                .addTapin('checkNeedMeasure', tapins.checkNeedMeasure)
                .addTapin('invalidateFuture', tapins.invalidateFuture)
                .addTapin('prepareOverride', tapins.prepareOverride)
                .addTapin('doOverride', tapins.doOverride)
                .addTapin('completeOverride', tapins.completeOverride)
                //NOTE: Impl aborts when (no parent or parent is Canvas) AND (self is Canvas or not a layout container)
                .addTapin('finishDesired', tapins.finishDesired);
        }

        createState (): IState {
            return {
                availableSize: new Size()
            };
        }

        createOutput (): IOutput {
            return {
                error: null,
                previousConstraint: new Size(),
                desiredSize: new Size(),
                hiddenDesire: new Size(),
                dirtyFlags: 0
            };
        }
    }
}