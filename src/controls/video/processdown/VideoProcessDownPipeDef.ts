module minerva.controls.video.processdown {
    export interface IInput extends core.processdown.IInput, core.helpers.ISized {
        source: IVideoSource;
        stretch: Stretch;
        vidXform: number[];
        overlap: RectOverlap;
        renderSize: Size;
    }
    export interface IState extends core.processdown.IState {
        vidRect: Rect;
        paintRect: Rect;
        calcVideoMetrics: boolean;
        vidAdjust: boolean; //TODO: This may be overkill, requires more investigation
    }
    export interface IOutput extends core.processdown.IOutput {
        vidXform: number[];
        overlap: RectOverlap;
    }

    export class VideoProcessDownPipeDef extends core.processdown.ProcessDownPipeDef {
        constructor () {
            super();
            //TODO: Should we merge the overlap into the layout clip for render?
            this.addTapinBefore('processLayoutClip', 'checkNeedVideoMetrics', tapins.checkNeedVideoMetrics)
                .addTapinAfter('checkNeedVideoMetrics', 'prepareVideoMetrics', tapins.prepareVideoMetrics)
                .addTapinAfter('prepareVideoMetrics', 'calcVideoTransform', tapins.calcVideoTransform)
                .addTapinAfter('calcVideoTransform', 'calcOverlap', tapins.calcOverlap);
        }

        createState () {
            var state = <IState>super.createState();
            state.vidRect = new Rect();
            state.paintRect = new Rect();
            state.calcVideoMetrics = false;
            state.vidAdjust = false;
            return state;
        }

        createOutput () {
            var output = <IOutput>super.createOutput();
            output.vidXform = mat3.identity();
            output.overlap = RectOverlap.In;
            return output;
        }

        prepare (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree) {
            super.prepare(input, state, output, vpinput, tree);
            output.overlap = input.overlap;
            mat3.copyTo(input.vidXform, output.vidXform);
        }

        flush (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree) {
            super.flush(input, state, output, vpinput, tree);
            input.overlap = output.overlap;
            mat3.copyTo(output.vidXform, input.vidXform);
        }
    }
}