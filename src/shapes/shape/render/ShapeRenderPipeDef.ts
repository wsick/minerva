module minerva.shapes.shape.render {
    export interface IInput extends core.render.IInput {
        shape: core.IShape;
        extents: Rect;
        shapeFlags: ShapeFlags;
        stretchXform: number[];
    }
    export interface IState extends core.render.IState {
        shouldDraw: boolean;
    }
    export interface IOutput extends core.render.IOutput {
    }

    export class ShapeRenderPipeDef extends core.render.RenderPipeDef {
        constructor () {
            super();
            this.addTapinBefore('doRender', 'calcShouldDraw', tapins.calcShouldDraw)
                .addTapinBefore('doRender', 'prepareDraw', tapins.prepareDraw)
                .replaceTapin('doRender', tapins.draw)
                .addTapinAfter('doRender', 'finishDraw', tapins.finishDraw);
        }

        createState (): IState {
            var state = <IState>super.createState();
            state.shouldDraw = false;
            return state;
        }
    }
}