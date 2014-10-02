module minerva.controls.border.arrange {
    export interface IInput extends core.arrange.IInput {
        padding: Thickness;
        borderThickness: Thickness;
    }
    export interface IState extends core.arrange.IState {
        totalBorder: Thickness;
        childRect: Rect;
    }
    export interface IOutput extends core.arrange.IOutput {
    }

    export class BorderArrangePipeDef extends core.arrange.ArrangePipeDef {
        constructor () {
            super();
            this.addTapinBefore('doOverride', 'preOverride', preOverride)
                .replaceTapin('doOverride', doOverride);
        }

        createState (): IState {
            var state = <IState>super.createState();
            state.totalBorder = new Thickness();
            state.childRect = new Rect();
            return state;
        }
    }

    export function preOverride (input: IInput, state: IState, output: IOutput, tree: BorderTree, finalRect: Rect): boolean {
        if (!tree.child)
            return true;
        var tb = state.totalBorder;
        Thickness.copyTo(input.padding, tb);
        Thickness.add(tb, input.borderThickness);

        var cr = state.childRect;
        cr.x = cr.y = 0;
        Size.copyTo(state.finalSize, cr);
        Thickness.shrinkSize(tb, cr);
        return true;
    }

    export function doOverride (input: IInput, state: IState, output: IOutput, tree: BorderTree, finalRect: Rect): boolean {
        if (tree.child)
            tree.child.arrange(state.childRect);
        return true;
    }
}
