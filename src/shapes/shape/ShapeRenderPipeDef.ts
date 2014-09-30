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
        path: IPath;
    }

    export class ShapeRenderPipeDef extends layout.render.RenderPipeDef {
        constructor () {
            super();
            this.addTapinBefore('doRender', 'calcShouldDraw', calcShouldDraw)
                .addTapinBefore('doRender', 'buildPath', buildPath)
                .addTapinBefore('doRender', 'buildStroke', buildStroke)
                .addTapinBefore('doRender', 'prepareDraw', prepareDraw)
                .replaceTapin('doRender', draw)
                .addTapinAfter('doRender', 'finishDraw', finishDraw);
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

        createOutput (): IOutput {
            var output = <IOutput>super.createOutput();
            output.path = null;
            return output;
        }

        prepare (input: IInput, state: IState, output: IOutput, ctx: layout.render.RenderContext, region: Rect) {
            output.path = input.path;
        }

        flush (input: IInput, state: IState, output: IOutput, ctx: layout.render.RenderContext, region: Rect) {
            input.path = output.path;
        }
    }

    function calcShouldDraw (input: IInput, state: IState, output: IOutput, ctx: layout.render.RenderContext, region: Rect): boolean {
        state.shouldDraw = false;
        if ((input.shapeFlags & ShapeFlags.Empty) === 0)
            return true;
        if (!input.fill && !input.stroke)
            return true;
        state.shouldDraw = true;
        return true;
    }

    function buildPath (input: IInput, state: IState, output: IOutput, ctx: layout.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        return true;
    }

    function buildStroke (input: IInput, state: IState, output: IOutput, ctx: layout.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        var sp = state.strokePars;
        sp.thickness = !input.stroke ? 0.0 : input.strokeThickness;
        sp.startCap = input.strokeStartLineCap;
        sp.endCap = input.strokeEndLineCap;
        sp.join = input.strokeLineJoin;
        sp.miterLimit = input.strokeMiterLimit;
        return true;
    }

    function prepareDraw (input: IInput, state: IState, output: IOutput, ctx: layout.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        ctx.save();
        ctx.pretransformMatrix(input.stretchXform);
    }

    function draw (input: IInput, state: IState, output: IOutput, ctx: layout.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        if (output.path)
            output.path.draw(ctx);
        if (input.fill)
            ctx.fillEx(input.fill, input.extents, input.fillRule);
        ctx.strokeEx(input.stroke, state.strokePars, input.extents);
    }

    function finishDraw (input: IInput, state: IState, output: layout.render.IOutput, ctx: layout.render.RenderContext, region: Rect): boolean {
        if (!state.shouldDraw)
            return true;
        ctx.restore();
    }
}