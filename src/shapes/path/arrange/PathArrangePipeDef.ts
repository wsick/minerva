/// <reference path="../../shape/arrange/ShapeArrangePipeDef" />

module minerva.shapes.path.arrange {
    export interface IInput extends shape.arrange.IInput {
        data: AnonPathGeometry;
        stretchXform: number[];
    }
    export interface IState extends shape.arrange.IState {
    }
    export interface IOutput extends shape.arrange.IOutput {
        stretchXform: number[];
    }

    export class PathArrangePipeDef extends shape.arrange.ShapeArrangePipeDef {
        constructor () {
            super();
            this.addTapinAfter('doOverride', 'adjustNoStretchArranged', tapins.adjustNoStretchArranged)
                .addTapinAfter('buildRenderSize', 'buildStretchXform', tapins.buildStretchXform);
        }

        createOutput () {
            var output = <IOutput>super.createOutput();
            output.stretchXform = mat3.identity();
            return output;
        }

        prepare (input: IInput, state: IState, output: IOutput) {
            mat3.copyTo(input.stretchXform, output.stretchXform);
            super.prepare(input, state, output);
        }

        flush (input: IInput, state: IState, output: IOutput) {
            super.flush(input, state, output);
            mat3.copyTo(output.stretchXform, input.stretchXform);
        }
    }

    export module tapins {
        export function adjustNoStretchArranged (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree) {
            if (input.stretch === Stretch.None) {
                var nb = input.naturalBounds;
                var as = state.arrangedSize;
                as.width = nb.width + Math.max(0, nb.x);
                as.height = nb.height + Math.max(0, nb.y);
            }

            return true;
        }

        export function buildStretchXform (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree) {
            if (input.stretch === Stretch.None)
                return true;

            var xform = output.stretchXform;
            var nb = input.naturalBounds;
            var rs = output.renderSize;
            mat3.createTranslate(-nb.x, -nb.y, xform);
            mat3.scale(xform, rs.width / nb.width, rs.height / nb.height);

            return true;
        }
    }
}