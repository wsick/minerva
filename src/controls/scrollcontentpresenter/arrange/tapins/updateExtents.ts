module minerva.controls.scrollcontentpresenter.arrange.tapins {
    export function updateExtents (input: IInput, state: IState, output: core.arrange.IOutput, tree: ScrollContentPresenterUpdaterTree, availableSize: Size): boolean {
        var sd = input.scrollData;
        var viewport = state.finalSize;

        var changed = sd.viewportWidth !== viewport.width
            || sd.viewportHeight !== viewport.height;
        sd.viewportWidth = viewport.width;
        sd.viewportHeight = viewport.height;

        if (helpers.clampOffsets(sd) || changed) {
            //TODO: InvalidateScrollInfo
            //this.ScrollOwner.InvalidateScrollInfo();
        }

        return true;
    }
}