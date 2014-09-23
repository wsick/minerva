module minerva.layout.arrange.tapins {
    var testRect = new Rect();
    var fwClip = new Rect();
    //NOTE: Panels will change this so layout clip doesn't calculate at all
    export var buildLayoutClip: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, finalRect: Rect): boolean {
        if (input.isTopLevel)
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
        Size.copyTo(output.arrangedSize, testRect);
        if (!Rect.isContainedIn(testRect, layoutClip) || !Size.isEqual(state.constrained, output.arrangedSize)) {
            fwClip.width = Number.POSITIVE_INFINITY;
            fwClip.height = Number.POSITIVE_INFINITY;
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