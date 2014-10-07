module minerva.controls.image.render {
    export interface IInput extends core.render.IInput {
        source: IImageSource;
        renderSize: Size;
    }
    export interface IState extends core.render.IState {
        metrics: IImageRenderMetrics;
    }

    export class ImageRenderPipeDef extends core.render.RenderPipeDef {
        constructor() {
            super();
            this.addTapinBefore('doRender', 'calcMetrics', tapins.calcMetrics)
                .replaceTapin('doRender', tapins.doRender);
        }

        createState() {
            var state = <IState>super.createState();
            state.metrics = {
                matrix: mat3.identity(),
                overlap: RectOverlap.In
            };
            return state;
        }
    }
}