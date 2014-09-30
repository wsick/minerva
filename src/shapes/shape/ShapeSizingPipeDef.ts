module minerva.shapes.shape.sizing {
    export interface IInput extends layout.sizing.IInput {
        naturalBounds: Rect;
        stretch: Stretch;
    }
    export interface IState extends layout.sizing.IState {
        shouldStretch: boolean;
    }
    export interface IOutput extends layout.sizing.IOutput {
    }

    export class ShapeSizingPipeDef extends layout.sizing.SizingPipeDef {
        constructor () {
            super();
            this.addTapinAfter('computeActual', 'calcShouldStretch', calcShouldStretch)
                .addTapinAfter('calcShouldStretch', 'stretchActual', stretchActual);
        }

        createState (): IState {
            var state = <IState>super.createState();
            state.shouldStretch = false;
            return state;
        }
    }

    function calcShouldStretch (input: IInput, state: IState, output: layout.sizing.IOutput, tree: layout.IUpdaterTree): boolean {
        state.shouldStretch = false;

        // If visual parent is canvas and no previousConstraint and no layoutSlot
        //  return true

        if (!tree.surface)
            return true;

        var nb = input.naturalBounds;
        if (nb.width <= 0 && nb.height <= 0)
            return true;

        if (input.stretch === Stretch.None && !Rect.isEmpty(nb)) {
            Size.copyTo(nb, output.actualSize);
            return true;
        }

        state.shouldStretch = true;
        return true;
    }

    function stretchActual (input: IInput, state: IState, output: layout.sizing.IOutput, tree: layout.IUpdaterTree): boolean {
        if (!state.shouldStretch)
            return true;

        var nb = input.naturalBounds;
        var as = output.actualSize;
        if (!isFinite(as.width))
            as.width = nb.width;
        if (!isFinite(as.height))
            as.height = nb.height;

        var sx = 1.0;
        var sy = 1.0;
        if (nb.width > 0)
            sx = as.width / nb.width;
        if (nb.height > 0)
            sy = as.height / nb.height;

        switch (input.stretch) {
            case Stretch.Uniform:
                sx = sy = Math.min(sx, sy);
                break;
            case Stretch.UniformToFill:
                sx = sy = Math.max(sx, sy);
                break;
            default:
                break;
        }

        as.width = Math.min(as.width, nb.width * sx);
        as.height = Math.min(as.height, nb.height * sy);
    }
}