module minerva.def.processdown {
    export interface IProcessDownTapin extends ITapin {
        (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput):boolean;
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
        totalIsRenderVisible: boolean;
        totalOpacity: number;
        totalIsHitTestVisible: boolean;
        layoutClip: Rect;
        compositeLayoutClip: Rect;
        dirtyFlags: layout.DirtyFlags;
        uiFlags: layout.UIFlags;
    }
    export interface IState extends IPipeState {
        xformOrigin: Point;
        localXform: number[];
    }
    export interface IOutput extends IPipeOutput {
        totalIsRenderVisible: boolean;
        totalOpacity: number;
        totalIsHitTestVisible: boolean;
        z: number;
        compositeLayoutClip: Rect;
        dirtyFlags: layout.DirtyFlags;
        uiFlags: layout.UIFlags;
    }

    export class ProcessDownPipeDef extends PipeDef<IProcessDownTapin, IInput, IState, IOutput> {
        constructor() {
            super();
            this.addTapin('processRenderVisibility', tapins.processRenderVisibility)
                .addTapin('processHitTestVisibility', tapins.processHitTestVisibility)
                .addTapin('calcXformOrigin', tapins.calcXformOrigin)
                .addTapin('processLocalXform', tapins.processLocalXform)
                .addTapin('processLocalProjection', tapins.processLocalProjection)
                .addTapin('processXform', tapins.processXform)
                .addTapin('processLayoutClip', tapins.processLayoutClip)
                .addTapin('processZIndices', tapins.processZIndices)
                .addTapin('propagateDirtyToChildren', tapins.propagateDirtyToChildren);
        }

        createState(): IState {
            return <IState>{
                xformOrigin: new Point(),
                localXform: mat3.identity()
            };
        }

        createOutput(): IOutput {
            return <IOutput>{

            };
        }

        prepare(input: IInput, state: IState, output: IOutput) {

        }

        flush(input: IInput, state: IState, output: IOutput) {

            // DirtyFlags.Transform most likely won't be set on input or outpu
        }
    }
}