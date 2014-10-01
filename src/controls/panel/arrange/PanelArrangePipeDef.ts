module minerva.controls.panel.arrange {
    export interface IState extends core.arrange.IState {
        childRect: Rect;
    }

    export class PanelArrangePipeDef extends core.arrange.ArrangePipeDef {
        constructor() {
            super();
            this.replaceTapin('doOverride', doOverride);
        }

        createState(): IState {
            var state = <IState>super.createState();
            state.childRect = new Rect();
            return state;
        }
    }

    function doOverride(input: core.arrange.IInput, state: IState, output: core.arrange.IOutput, tree: core.IUpdaterTree, finalRect: Rect): boolean {
        var cr = state.childRect;
        cr.x = cr.y = 0;
        Size.copyTo(state.finalSize, cr);
        Size.copyTo(state.finalSize, output.arrangedSize);

        for (var walker = tree.walk(); walker.step();) {
            walker.current.arrange(cr);
        }

        return true;
    }
}