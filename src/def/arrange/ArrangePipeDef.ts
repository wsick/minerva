module minerva.def.arrange {
    export interface IArrangeTapin extends ITapin {
        (input: IInput, state: IState, output: IOutput, finalRect: Rect):boolean;
    }
    export interface IInput extends IPipeInput {
        hiddenDesire: Size;
    }
    export interface IState extends IPipeState {
    }
    export interface IOutput extends IPipeOutput {
    }

    export class ArrangePipe extends PipeDef<IArrangeTapin, IInput, IState, IOutput> {
        constructor () {
            super();
            this.addTapin('applyRounding', null)
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
            };
        }

        createOutput (): IOutput {
            return {
            };
        }
    }
}