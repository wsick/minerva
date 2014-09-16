module minerva.def.arrange {
    export interface IArrangeTapin extends ITapin {
        (input: IInput, state: IState, output: IOutput, finalRect: Rect):boolean;
    }
    export interface IInput extends IPipeInput {
        useLayoutRounding: boolean;
        hiddenDesire: Size;
        dirtyFlags: layout.DirtyFlags;
    }
    export interface IState extends IPipeState {
        finalRect: Rect;
    }
    export interface IOutput extends IPipeOutput {
        dirtyFlags: layout.DirtyFlags;
    }

    export class ArrangePipe extends PipeDef<IArrangeTapin, IInput, IState, IOutput> {
        constructor () {
            super();
            this.addTapin('applyRounding', tapins.applyRounding)
                .addTapin('validateFinalRect', null)
                .addTapin('validateVisibility', null)
                .addTapin('checkNeedArrange', null)
                .addTapin('ensureMeasured', null)
                .addTapin('applyMargin', null)
                .addTapin('clearLayoutClip', null)
                .addTapin('invalidateFuture', null)
                .addTapin('prepareOverride', null)
                .addTapin('doOverride', null)
                .addTapin('completeOverride', null)
                .addTapin('buildLayoutXform', null)
                .addTapin('buildRenderSize', null);
            //...more
        }

        createState (): IState {
            return {
                finalRect: new Rect()
            };
        }

        createOutput (): IOutput {
            return {
                dirtyFlags: 0
            };
        }

        prepare (input: IInput, state: IState, output: IOutput) {
            output.dirtyFlags = input.dirtyFlags;
        }

        flush (input: IInput, state: IState, output: IOutput) {
            input.dirtyFlags = output.dirtyFlags;
        }
    }
}