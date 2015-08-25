module minerva.controls.video.render {
    export interface IInput extends core.render.IInput {
        source: IVideoSource;
        vidXform: number[];
        overlap: RectOverlap;
    }
    export interface IState extends core.render.IState {
    }

    export class VideoRenderPipeDef extends core.render.RenderPipeDef {
        constructor() {
            super();
            this.replaceTapin('doRender', tapins.doRender);
        }
    }
}