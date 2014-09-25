module minerva.controls.border.render {
    export class RenderPipeDef extends layout.render.RenderPipeDef {
        constructor () {
            super();
            this.addTapinBefore('doRender', 'calcShouldRender', tapins.calcShouldRender)
                .addTapinBefore('doRender', 'calcInnerOuter', tapins.calcInnerOuter)
                .replaceTapin('doRender', tapins.doRender);
        }

        createState (): IState {
            var state = <IState>super.createState();
            state.fillExtents = new Rect();
            state.innerCornerRadius = new CornerRadius();
            state.outerCornerRadius = new CornerRadius();
            return state;
        }
    }

    export interface IInput extends layout.render.IInput {
        extents: Rect;
        backgroundBrush: IBrush;
        borderBrush: IBrush;
        borderThickness: Thickness;
        cornerRadius: CornerRadius;
    }
    export interface IState extends layout.render.IState {
        shouldRender: boolean;
        fillExtents: Rect;
        innerCornerRadius: CornerRadius;
        outerCornerRadius: CornerRadius;
    }
}