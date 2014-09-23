module minerva.def.processdown {
    export interface IProcessDownTapin extends ITapin {
        (input: IInput, state: IState, output: IOutput, vpinput: IInput):boolean;
    }
    export interface IInput extends IPipeInput {
        visibility: Visibility;
        opacity: number;
        isHitTestVisible: boolean;
        renderTransform: number[];
        renderTransformOrigin: Point;
        projection: IProjection;
        actualWidth: number;
        actualHeight: number;
        surfaceBoundsWithChildren: Rect;
        totalIsRenderVisible: boolean;
        totalOpacity: number;
        totalIsHitTestVisible: boolean;
        z: number;
        layoutClip: Rect;
        compositeLayoutClip: Rect;
        layoutXform: number[];
        carrierXform: number[];
        renderXform: number[];
        absoluteXform: number[];
        carrierProjection: number[];
        localProjection: number[];
        absoluteProjection: number[];
        totalHasRenderProjection: boolean;
        dirtyFlags: DirtyFlags;
    }
    export interface IState extends IPipeState {
        xformOrigin: Point;
        localXform: number[];
        renderAsProjection: number[];
    }
    export interface IOutput extends IPipeOutput {
        totalIsRenderVisible: boolean;
        totalOpacity: number;
        totalIsHitTestVisible: boolean;
        z: number;
        compositeLayoutClip: Rect;
        renderXform: number[];
        absoluteXform: number[];
        localProjection: number[];
        absoluteProjection: number[];
        totalHasRenderProjection: boolean;
        dirtyFlags: DirtyFlags;
    }

    export class ProcessDownPipeDef extends PipeDef<IProcessDownTapin, IInput, IState, IOutput> {
        constructor () {
            super();
            this.addTapin('processRenderVisibility', tapins.processRenderVisibility)
                .addTapin('processHitTestVisibility', tapins.processHitTestVisibility)
                .addTapin('calcXformOrigin', tapins.calcXformOrigin)
                .addTapin('processLocalXform', tapins.processLocalXform)
                .addTapin('processLocalProjection', tapins.processLocalProjection)
                .addTapin('calcRenderXform', tapins.calcRenderXform)
                .addTapin('calcLocalProjection', tapins.calcLocalProjection)
                .addTapin('calcAbsoluteXform', tapins.calcAbsoluteXform)
                .addTapin('calcAbsoluteProjection', tapins.calcAbsoluteProjection)
                .addTapin('processXform', tapins.processXform)
                .addTapin('processLayoutClip', tapins.processLayoutClip)
                .addTapin('processZIndices', tapins.processZIndices);
        }

        createState (): IState {
            return {
                xformOrigin: new Point(),
                localXform: mat3.identity(),
                renderAsProjection: mat4.identity()
            };
        }

        createOutput (): IOutput {
            return {
                totalIsRenderVisible: false,
                totalOpacity: 1.0,
                totalIsHitTestVisible: false,
                z: NaN,
                compositeLayoutClip: null,
                renderXform: mat3.identity(),
                absoluteXform: mat3.identity(),
                localProjection: mat4.identity(),
                absoluteProjection: mat4.identity(),
                totalHasRenderProjection: false,
                dirtyFlags: 0
            };
        }

        prepare (input: IInput, state: IState, output: IOutput, vpinput: IInput) {
            if ((input.dirtyFlags & (DirtyFlags.LocalProjection | DirtyFlags.LocalTransform)) > 0) {
                input.dirtyFlags |= DirtyFlags.Transform;
            }
            output.dirtyFlags = input.dirtyFlags;
            output.totalIsRenderVisible = input.totalIsRenderVisible;
            output.totalOpacity = input.totalOpacity;
            output.totalIsHitTestVisible = input.totalIsHitTestVisible;
            output.z = input.z;
            Rect.copyTo(input.compositeLayoutClip, output.compositeLayoutClip);
            mat3.set(input.renderXform, output.renderXform);
            mat3.set(input.absoluteXform, output.absoluteXform);
            mat4.set(input.localProjection, output.localProjection);
            mat4.set(input.absoluteProjection, output.absoluteProjection);
            output.totalHasRenderProjection = input.totalHasRenderProjection;
        }

        flush (input: IInput, state: IState, output: IOutput, vpinput: IInput) {
            var upDirty = (output.dirtyFlags & ~input.dirtyFlags) & DirtyFlags.UpDirtyState;
            if (upDirty > 0) {
                //TODO: add dirty element
            }
            input.dirtyFlags = output.dirtyFlags & ~DirtyFlags.DownDirtyState;
            input.totalIsRenderVisible = output.totalIsRenderVisible;
            input.totalOpacity = output.totalOpacity;
            input.totalIsHitTestVisible = output.totalIsHitTestVisible;
            input.z = output.z;
            Rect.copyTo(output.compositeLayoutClip, input.compositeLayoutClip);
            mat3.set(output.renderXform, input.renderXform);
            mat3.set(output.absoluteXform, input.absoluteXform);
            mat4.set(output.localProjection, input.localProjection);
            mat4.set(output.absoluteProjection, input.absoluteProjection);
            input.totalHasRenderProjection = output.totalHasRenderProjection;
        }
    }
}