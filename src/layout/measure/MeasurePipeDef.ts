module minerva.layout.measure {
    export interface IMeasureTapin extends pipe.ITapin {
        (input: IInput, state: IState, output: IOutput, availableSize: Size):boolean;
    }
    export interface IInput extends pipe.IPipeInput, helpers.ISized {
        margin: Thickness;
        previousConstraint: Size;
        visibility: Visibility;
        desiredSize: Size;
        hiddenDesire: Size;
        dirtyFlags: DirtyFlags;
        uiFlags: UIFlags;
    }
    export interface IState extends pipe.IPipeState {
        availableSize: Size;
    }
    export interface IOutput extends pipe.IPipeOutput {
        error: string;
        previousConstraint: Size;
        desiredSize: Size;
        hiddenDesire: Size;
        dirtyFlags: DirtyFlags;
        uiFlags: UIFlags;
        newUpDirty: DirtyFlags;
        newDownDirty: DirtyFlags;
        newUiFlags: UIFlags;
    }

    export class MeasurePipeDef extends pipe.TriPipeDef<IMeasureTapin, IInput, IState, IOutput> {
        constructor () {
            super();
            this.addTapin('validate', tapins.validate)
                .addTapin('validateVisibility', tapins.validateVisibility)
                .addTapin('applyTemplate', tapins.applyTemplate)
                .addTapin('checkNeedMeasure', tapins.checkNeedMeasure)
                .addTapin('invalidateFuture', tapins.invalidateFuture)
                .addTapin('prepareOverride', tapins.prepareOverride)
                .addTapin('doOverride', tapins.doOverride) //must set desiredSize
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
                dirtyFlags: 0,
                uiFlags: 0,
                newUpDirty: 0,
                newDownDirty: 0,
                newUiFlags: 0
            };
        }

        prepare (input: IInput, state: IState, output: IOutput) {
            output.dirtyFlags = input.dirtyFlags;
            Size.copyTo(input.previousConstraint, output.previousConstraint);
            Size.copyTo(input.hiddenDesire, output.hiddenDesire);
        }

        flush (input: IInput, state: IState, output: IOutput) {
            var newDirty = output.dirtyFlags & ~input.dirtyFlags;
            output.newUpDirty = newDirty & DirtyFlags.UpDirtyState;
            output.newDownDirty = newDirty & DirtyFlags.DownDirtyState;
            output.newUiFlags = output.uiFlags & ~input.uiFlags;
            input.dirtyFlags = output.dirtyFlags;
            input.uiFlags = output.uiFlags;
            Size.copyTo(output.previousConstraint, input.previousConstraint);
            Size.copyTo(output.hiddenDesire, input.hiddenDesire);
            Size.copyTo(output.desiredSize, input.desiredSize);
        }
    }
}