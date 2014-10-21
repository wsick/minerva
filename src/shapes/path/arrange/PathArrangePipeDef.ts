/// <reference path="../../shape/arrange/ShapeArrangePipeDef" />

module minerva.shapes.path.arrange {
    export interface IInput extends shape.arrange.IInput {
        data: AnonPathGeometry;
    }
    export interface IState extends shape.arrange.IState {
    }
    export interface IOutput extends shape.arrange.IOutput {
    }

    export class PathArrangePipeDef extends shape.arrange.ShapeArrangePipeDef {
        constructor () {
            super();
            this.addTapinAfter('doOverride', 'adjustNoStretchArranged', tapins.adjustNoStretchArranged);
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
    }
}