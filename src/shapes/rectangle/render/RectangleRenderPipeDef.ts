/// <reference path="../../shape/render/ShapeRenderPipeDef" />

module minerva.shapes.rectangle.render {
    export interface IInput extends shape.render.IInput {
        actualWidth: number;
        actualHeight: number;

        radiusX: number;
        radiusY: number;
    }
    export interface IState extends shape.render.IState {
    }
    export interface IOutput extends shape.render.IOutput {
    }

    export class RectangleRenderPipeDef extends shape.render.ShapeRenderPipeDef {
        constructor () {
            super();
            this.replaceTapin('draw', tapins.draw);
        }
    }

    export module tapins {
        export function draw (input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect): boolean {
            if (!state.shouldDraw)
                return true;

            var width = input.actualWidth;
            var height = input.actualHeight;
            var rx = Math.min(Math.abs(input.radiusX), width / 2.0);
            if (isNaN(rx))
                rx = 0;
            var ry = Math.min(Math.abs(input.radiusY), height / 2.0);
            if (isNaN(ry))
                ry = 0;
            helpers.draw(ctx.raw, 0, 0, width, height, rx, ry);

            return true;
        }
    }
}