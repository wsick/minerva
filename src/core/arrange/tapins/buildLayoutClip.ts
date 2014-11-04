module minerva.core.arrange.tapins {
    var testRect = new Rect();

    export var buildLayoutClip: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, tree: IUpdaterTree, finalRect: Rect): boolean {
        Point.copyTo(state.visualOffset, testRect);
        Size.copyTo(state.arrangedSize, testRect);

        var lc = output.layoutClip;
        Rect.copyTo(state.finalRect, lc);
        if (input.useLayoutRounding) {
            lc.x = Math.round(lc.x);
            lc.y = Math.round(lc.y);
        }

        if ((!tree.isTop && !Rect.isContainedIn(testRect, lc)) || !Size.isEqual(state.constrained, state.arrangedSize)) {
            Rect.intersection(lc, testRect);
        } else {
            lc.x = lc.y = lc.width = lc.height = 0;
        }

        if (!Rect.isEqual(output.layoutClip, input.layoutClip)) {
            output.dirtyFlags |= DirtyFlags.LayoutClip;
        }

        return true;
    };
}