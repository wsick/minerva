module minerva.controls.scrollcontentpresenter.arrange {
    export interface IInput extends core.arrange.IInput {
        scrollData: IScrollData;
        desiredSize: Size;
    }
    export interface IState extends core.arrange.IState {
        childRect: Rect;
    }

    export class ScrollContentPresenterArrangePipeDef extends core.arrange.ArrangePipeDef {
        constructor () {
            super();
            this.replaceTapin('doOverride', tapins.doOverride)
                .addTapinAfter('doOverride', 'updateClip', tapins.updateClip)
                .addTapinAfter('updateClip', 'updateExtents', tapins.updateExtents);
        }

        createState (): IState {
            var state = <IState>super.createState();
            state.childRect = new Rect();
            return state;
        }
    }
}