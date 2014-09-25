module minerva.controls.border.render {
    export class ShimRenderPipeDef extends RenderPipeDef {
        constructor () {
            super();
            this.addTapinBefore('doRender', 'calcBalanced', tapins.shim.calcBalanced)
                .addTapinBefore('doRender', 'invalidatePattern', tapins.shim.invalidatePattern)
                .addTapinBefore('doRender', 'createPattern', tapins.shim.createPattern)
                .replaceTapin('doRender', tapins.shim.doRender);
        }

        createState (): IShimState {
            var state = <IShimState>super.createState();
            state.middleCornerRadius = new CornerRadius();
            state.strokeExtents = new Rect();
            state.pattern = null;
            state.oldMetrics = null;
            return state;
        }
    }

    export interface IShimState extends IState {
        middleCornerRadius: CornerRadius;
        strokeExtents: Rect;
        pattern: CanvasPattern;
        oldMetrics: any;
    }
}