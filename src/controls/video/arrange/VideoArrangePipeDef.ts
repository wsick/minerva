module minerva.controls.video.arrange {
    export interface IInput extends core.arrange.IInput {
        source: IVideoSource;
        stretch: Stretch;
    }
    export interface IState extends core.arrange.IState {
        videoBounds: Rect;
        stretchX: number;
        stretchY: number;
    }

    export class VideoArrangePipeDef extends core.arrange.ArrangePipeDef {
        constructor () {
            super();
            this.addTapinAfter('invalidateFuture', 'invalidateMetrics', tapins.invalidateMetrics)
                .addTapinBefore('doOverride', 'calcVideoBounds', tapins.calcVideoBounds)
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
