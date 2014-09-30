module minerva.shapes.shape.render {
    export interface IInput extends layout.render.IInput {
        extents: Rect;
        shapeFlags: ShapeFlags;
        stretchXform: number[];

        fill: IBrush;
        fillRule: FillRule;
        stroke: IBrush;
        strokeThickness: number;
        strokeStartLineCap: PenLineCap;
        strokeEndLineCap: PenLineCap;
        strokeLineJoin: PenLineJoin;
        strokeMiterLimit: number;

        path: IPath;
    }
    export interface IState extends layout.render.IState {
        shouldDraw: boolean;
        strokePars: IStrokeParameters;
    }
    export interface IOutput extends layout.render.IOutput {
    }

    export class ShapeRenderPipeDef extends layout.render.RenderPipeDef {
        constructor () {
            super();
            this.addTapinBefore('doRender', 'calcShouldDraw', tapins.calcShouldDraw)
                .addTapinBefore('doRender', 'buildStroke', tapins.buildStroke)
                .addTapinBefore('doRender', 'prepareDraw', tapins.prepareDraw)
                .replaceTapin('doRender', tapins.draw)
                .addTapinAfter('doRender', 'finishDraw', tapins.finishDraw);
        }

        createState (): IState {
            var state = <IState>super.createState();
            state.shouldDraw = false;
            state.strokePars = {
                thickness: 0,
                startCap: PenLineCap.Flat,
                endCap: PenLineCap.Flat,
                join: PenLineJoin.Miter,
                miterLimit: 10
            };
            return state;
        }
    }
}