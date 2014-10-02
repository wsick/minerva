module minerva.controls.canvas.arrange.tapins {
    export function doOverride (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, finalRect: Rect): boolean {
        var cr = state.childRect;
        var child: core.Updater;
        for (var walker = tree.walk(); walker.step();) {
            child = walker.current;
            Size.copyTo(child.assets.desiredSize, cr);
            //TODO: Set cr.x
            //TODO: Set cr.y
            child.arrange(cr);
        }
        return true;
    }
}