module minerva.controls.video.measure {
    export interface IInput extends core.measure.IInput {
        source: IVideoSource;
        stretch: Stretch;
    }
    export interface IState extends core.measure.IState {
        videoBounds: Rect;
        stretchX: number;
        stretchY: number;
    }

    export class VideoMeasurePipeDef extends core.measure.MeasurePipeDef {
        constructor () {
            super();
            this.addTapinBefore('doOverride', 'calcVideoBounds', tapins.calcVideoBounds)
                .addTapinBefore('doOverride', 'calcStretch', tapins.calcStretch)
                .replaceTapin('doOverride', tapins.doOverride);
        }

        createState () {
            var state = <IState>super.createState();
            state.videoBounds = new Rect();
            state.stretchX = 0;
            state.stretchY = 0;
            return state;
        }
    }
}
