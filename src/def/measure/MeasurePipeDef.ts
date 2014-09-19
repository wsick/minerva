module minerva.def.measure {
    export interface IMeasureTapin extends ITapin {
        (input: IInput, state: IState, output: IOutput, availableSize: Size):boolean;
    }
    export interface IInput extends IPipeInput {
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
        hiddenDesire: Size;
        dirtyFlags: DirtyFlags;
        uiFlags: UIFlags;
    }
    export interface IState extends IPipeState {
        availableSize: Size;
    }
    export interface IOutput extends IPipeOutput {
        error: string;
        previousConstraint: Size;
        desiredSize: Size;
        hiddenDesire: Size;
        dirtyFlags: DirtyFlags;
        uiFlags: UIFlags;
    }

    export class MeasurePipeDef extends PipeDef<IMeasureTapin, IInput, IState, IOutput> {
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
                uiFlags: 0
            };
        }

        prepare (input: IInput, state: IState, output: IOutput) {
            output.dirtyFlags = input.dirtyFlags;
            Size.copyTo(input.previousConstraint, output.previousConstraint);
            Size.copyTo(input.hiddenDesire, output.hiddenDesire);
        }

        flush (input: IInput, state: IState, output: IOutput) {
            var newDirty = output.dirtyFlags & ~input.dirtyFlags;
            if (newDirty > 0) {
                //TODO: Add dirty elements
            }
            var newUi = output.uiFlags & ~input.uiFlags;
            if (newUi > 0) {
                //TODO: Propagate flags up
            }
            input.dirtyFlags = output.dirtyFlags;
            input.uiFlags = output.uiFlags;
            Size.copyTo(output.previousConstraint, input.previousConstraint);
            Size.copyTo(output.hiddenDesire, input.hiddenDesire);
            Size.copyTo(output.desiredSize, input.desiredSize);
        }
    }
}