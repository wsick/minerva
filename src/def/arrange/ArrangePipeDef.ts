module minerva.def.arrange {
    export interface IArrangeTapin extends ITapin {
        (input: IInput, state: IState, output: IOutput, finalRect: Rect):boolean;
    }
    export interface IInput extends IPipeInput, helpers.ISized {
        margin: Thickness;
        horizontalAlignment: HorizontalAlignment;
        verticalAlignment: VerticalAlignment;
        visibility: Visibility;
        hiddenDesire: Size;
        dirtyFlags: DirtyFlags;
        uiFlags: UIFlags;
        layoutSlot: Rect;
        renderSize: Size;
        lastRenderSize: Size;
        layoutClip: Rect; //NOTE: empty represents no layout clip
        isTopLevel: boolean;
    }
    export interface IState extends IPipeState {
        finalRect: Rect;
        finalSize: Size;
        framework: Size;
        stretched: Size;
        constrained: Size;
        visualOffset: Point;
        flipHorizontal: boolean;
    }
    export interface IOutput extends IPipeOutput {
        error: string;
        dirtyFlags: DirtyFlags;
        layoutSlot: Rect;
        arrangedSize: Size;
        layoutXform: number[];
        layoutClip: Rect;
        renderSize: Size;
        lastRenderSize: Size;
        uiFlags: UIFlags;
        newUpDirty: DirtyFlags;
        newDownDirty: DirtyFlags;
        newUiFlags: UIFlags;
    }

    export class ArrangePipeDef extends PipeDef<IArrangeTapin, IInput, IState, IOutput> {
        constructor () {
            super();
            this.addTapin('applyRounding', tapins.applyRounding)
                .addTapin('validateFinalRect', tapins.validateFinalRect)
                .addTapin('validateVisibility', tapins.validateVisibility)
                .addTapin('checkNeedArrange', tapins.checkNeedArrange)
                //.addTapin('ensureMeasured', tapins.ensureMeasured) -> original only runs if haven't measured for Panel
                .addTapin('invalidateFuture', tapins.invalidateFuture)
                .addTapin('calcStretched', tapins.calcStretched)
                .addTapin('prepareOverride', tapins.prepareOverride)
                .addTapin('doOverride', tapins.doOverride) //must set arrangedSize
                .addTapin('completeOverride', tapins.completeOverride)
                .addTapin('calcFlip', tapins.calcFlip)
                .addTapin('calcVisualOffset', tapins.calcVisualOffset)
                .addTapin('buildLayoutClip', tapins.buildLayoutClip)
                .addTapin('buildLayoutXform', tapins.buildLayoutXform)
                .addTapin('buildRenderSize', tapins.buildRenderSize);
        }

        createState (): IState {
            return {
                finalRect: new Rect(),
                finalSize: new Size(),
                framework: new Size(),
                stretched: new Size(),
                constrained: new Size(),
                visualOffset: new Point(),
                flipHorizontal: false
            };
        }

        createOutput (): IOutput {
            return {
                error: null,
                dirtyFlags: 0,
                uiFlags: 0,
                layoutSlot: new Rect(),
                arrangedSize: new Size(),
                layoutXform: mat3.identity(),
                layoutClip: new Rect(),
                renderSize: new Size(),
                lastRenderSize: null,
                newUpDirty: 0,
                newDownDirty: 0,
                newUiFlags: 0
            };
        }

        prepare (input: IInput, state: IState, output: IOutput) {
            output.dirtyFlags = input.dirtyFlags;
            output.uiFlags = input.uiFlags;
            Rect.copyTo(input.layoutSlot, output.layoutSlot);
            Rect.copyTo(input.layoutClip, output.layoutClip);
            Size.copyTo(input.renderSize, output.renderSize);
            output.lastRenderSize = null;
        }

        flush (input: IInput, state: IState, output: IOutput) {
            var newDirty = output.dirtyFlags & ~input.dirtyFlags;
            output.newUpDirty = newDirty & DirtyFlags.UpDirtyState;
            output.newDownDirty = newDirty & DirtyFlags.DownDirtyState;
            output.newUiFlags = output.uiFlags & ~input.uiFlags;
            input.dirtyFlags = output.dirtyFlags;
            input.uiFlags = output.uiFlags;
            Rect.copyTo(output.layoutSlot, input.layoutSlot);
            Rect.copyTo(output.layoutClip, input.layoutClip);
            Size.copyTo(output.renderSize, input.renderSize);
            if (output.lastRenderSize)
                input.lastRenderSize = output.lastRenderSize;
        }
    }
}