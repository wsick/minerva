module minerva.core.arrange.tapins {
    var testRect = new Rect();
    var fwClip = new Rect();
    export var buildLayoutClip: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, tree: IUpdaterTree, finalRect: Rect): boolean {
        if (tree.isTop)
            return true;

        var layoutClip = output.layoutClip;
        var vo = state.visualOffset;

        Rect.copyTo(state.finalRect, output.layoutClip);
        layoutClip.x = Math.max(layoutClip.x - vo.x, 0);
        layoutClip.y = Math.max(layoutClip.y - vo.y, 0);

        if (input.useLayoutRounding) {
            layoutClip.x = Math.round(layoutClip.x);
            layoutClip.y = Math.round(layoutClip.y);
        }

        testRect.x = 0;
        testRect.y = 0;
        Size.copyTo(state.arrangedSize, testRect);
        if ((!Rect.isContainedIn(testRect, layoutClip) || !Size.isEqual(state.constrained, state.arrangedSize)) && tree.isContainer) {
            fwClip.x = fwClip.y = 0;
            fwClip.width = fwClip.height = Number.POSITIVE_INFINITY;
            helpers.coerceSize(fwClip, input);
            Rect.intersection(layoutClip, fwClip);
        } else {
            layoutClip.x = layoutClip.y = layoutClip.width = layoutClip.height = 0;
        }

        if (!Rect.isEqual(output.layoutClip, input.layoutClip)) {
            output.dirtyFlags |= DirtyFlags.LayoutClip;
        }

        return true;
    };
}