module minerva.controls.image.processdown {
    export interface IInput extends core.processdown.IInput {
        source: IImageSource;
        stretch: Stretch;
        imgXform: number[];
        overlap: RectOverlap;
    }
    export interface IState extends core.processdown.IState {
        imgRect: Rect;
        paintRect: Rect;
        calcImageMetrics: boolean;
        stretched: Rect;
        imgAdjust: boolean;
    }
    export interface IOutput extends core.processdown.IOutput {
        imgXform: number[];
        overlap: RectOverlap;
    }

    export class ImageProcessDownPipeDef extends core.processdown.ProcessDownPipeDef {
        constructor () {
            super();
            this.addTapinBefore('propagateDirtyToChildren', 'checkNeedImageMetrics', tapins.checkNeedImageMetrics)
                .addTapinAfter('checkNeedImageMetrics', 'prepareImageMetrics', tapins.prepareImageMetrics)
                .addTapinAfter('prepareImageMetrics', 'calcImageTransform', tapins.calcImageTransform)
                .addTapinAfter('calcImageTransform', 'calcOverlap', tapins.calcOverlap);
        }

        createState () {
            var state = <IState>super.createState();
            state.imgRect = new Rect();
            state.paintRect = new Rect();
            state.calcImageMetrics = false;
            state.stretched = new Rect();
            state.imgAdjust = false;
            return state;
        }

        createOutput () {
            var output = <IOutput>super.createOutput();
            output.imgXform = mat3.identity();
            output.overlap = RectOverlap.In;
            return output;
        }

        prepare (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree) {
            super.prepare(input, state, output, vpinput, tree);
            output.overlap = input.overlap;
            mat3.set(input.imgXform, output.imgXform);
        }

        flush (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree) {
            super.flush(input, state, output, vpinput, tree);
            input.overlap = output.overlap;
            mat3.set(output.imgXform, input.imgXform);
        }
    }
}