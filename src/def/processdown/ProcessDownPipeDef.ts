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
        actualWidth: number;
        actualHeight: number;
        totalIsRenderVisible: boolean;
        totalOpacity: number;
        totalIsHitTestVisible: boolean;
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
                .addTapin('processLocalProjection', null)
                .addTapin('processXform', null)
                .addTapin('processLayoutClip', null)
                .addTapin('processZIndices', null)
                .addTapin('propagateDirtyToChildren', null);
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

        }
    }
}