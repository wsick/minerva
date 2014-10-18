/// <reference path="../../shape/render/ShapeRenderPipeDef" />

module minerva.shapes.ellipse.render {
    export interface IInput extends shape.render.IInput {
        actualWidth: number;
        actualHeight: number;
    }
    export interface IState extends shape.render.IState {
    }
    export interface IOutput extends shape.render.IOutput {
    }

    export class EllipseRenderPipeDef extends shape.render.ShapeRenderPipeDef {
        constructor () {
            super();
            this.replaceTapin('draw', tapins.draw);
        }
    }

    export module tapins {
        export function draw (input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect): boolean {
            if (!state.shouldDraw)
                return true;

            helpers.draw(ctx.raw, 0, 0, input.actualWidth, input.actualHeight);

            return true;
        }
    }
}