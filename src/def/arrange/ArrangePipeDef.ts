module minerva.def.arrange {
    export interface IArrangeTapin extends ITapin {
        (input: IInput, state: IState, output: IOutput, finalRect: Rect):boolean;
    }
    export interface IInput extends IPipeInput {
        width: number;
        height: number;
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
        margin: Thickness;
        horizontalAlignment: HorizontalAlignment;
        verticalAlignment: VerticalAlignment;
        useLayoutRounding: boolean;
        visibility: Visibility;
        hiddenDesire: Size;
        dirtyFlags: layout.DirtyFlags;
        layoutSlot: Rect;
    }
    export interface IState extends IPipeState {
        finalRect: Rect;
        finalSize: Size;
        framework: Size;
        stretched: Size;
    }
    export interface IOutput extends IPipeOutput {
        error: string;
        dirtyFlags: layout.DirtyFlags;
        layoutSlot: Rect;
    }

    export class ArrangePipe extends PipeDef<IArrangeTapin, IInput, IState, IOutput> {
        constructor() {
            super();
            this.addTapin('applyRounding', tapins.applyRounding)
                .addTapin('validateFinalRect', tapins.validateFinalRect)
                .addTapin('validateVisibility', tapins.validateVisibility)
                .addTapin('checkNeedArrange', tapins.checkNeedArrange)
                //.addTapin('ensureMeasured', tapins.ensureMeasured) -> original only runs if haven't measured for Panel
                .addTapin('invalidateFuture', tapins.invalidateFuture)
                .addTapin('calcStretched', tapins.calcStretched)
                .addTapin('prepareOverride', tapins.prepareOverride)
                .addTapin('doOverride', null)
                .addTapin('completeOverride', null)
                .addTapin('buildLayoutXform', null)
                .addTapin('buildRenderSize', null);
            //...more
        }

        createState(): IState {
            return {
                finalRect: new Rect(),
                finalSize: new Size(),
                framework: new Size(),
                stretched: new Size()
            };
        }

        createOutput(): IOutput {
            return {
                error: null,
                dirtyFlags: 0,
                layoutSlot: new Rect()
            };
        }

        prepare(input: IInput, state: IState, output: IOutput) {
            output.dirtyFlags = input.dirtyFlags;
            Rect.copyTo(input.layoutSlot, output.layoutSlot);
        }

        flush(input: IInput, state: IState, output: IOutput) {
            input.dirtyFlags = output.dirtyFlags;
            Rect.copyTo(output.layoutSlot, input.layoutSlot);
        }
    }
}