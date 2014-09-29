module minerva.controls.border.arrange {
    export class ArrangePipeDef extends layout.arrange.ArrangePipeDef {
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

    export interface IInput extends layout.arrange.IInput {
        padding: Thickness;
        borderThickness: Thickness;
        childUpdater: BorderUpdater;
    }
    export interface IState extends layout.arrange.IState {
        totalBorder: Thickness;
        childRect: Rect;
    }

    export function preOverride (input: IInput, state: IState, output: layout.arrange.IOutput, finalRect: Rect): boolean {
        if (!input.childUpdater)
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

    export function doOverride (input: IInput, state: IState, output: layout.arrange.IOutput, finalRect: Rect): boolean {
        if (input.childUpdater)
            input.childUpdater.arrange(state.childRect);
        return true;
    }
}
