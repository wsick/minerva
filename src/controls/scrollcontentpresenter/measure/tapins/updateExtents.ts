module minerva.controls.scrollcontentpresenter.measure.tapins {
    export function updateExtents (input: IInput, state: IState, output: core.measure.IOutput, tree: ScrollContentPresenterUpdaterTree, availableSize: Size): boolean {
        var sd = input.scrollData;
        var viewport = state.availableSize;
        var extent = tree.content.assets.desiredSize;

        var changed = sd.viewportWidth !== viewport.width
            || sd.viewportHeight !== viewport.height
            || sd.extentWidth !== extent.width
            || sd.extentHeight !== extent.height;
        sd.viewportWidth = viewport.width;
        sd.viewportHeight = viewport.height;
        sd.extentWidth = extent.width;
        sd.extentHeight = extent.height;

        if (helpers.clampOffsets(sd) || changed) {
            //TODO: InvalidateScrollInfo
            //this.ScrollOwner.InvalidateScrollInfo();
        }

        return true;
    }
}