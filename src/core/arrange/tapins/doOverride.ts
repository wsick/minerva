module minerva.core.arrange.tapins {
    export var doOverride: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, tree: IUpdaterTree, finalRect: Rect): boolean {
        var as = state.arrangedSize;
        as.width = as.height = 0;
        for (var walker = tree.walk(); walker.step();) {
            var child = walker.current;
            child.measure(state.finalSize);
            Size.copyTo(child.assets.desiredSize, as);
        }
        return true;
    };
}