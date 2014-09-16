module minerva.def.arrange.tapins {
    export var prepareOverride: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, finalRect: Rect): boolean {
        var fs = state.finalSize;
        Size.copyTo(input.hiddenDesire, fs);
        var fr = state.finalRect;
        Rect.copyTo(fr, output.layoutSlot);

        Thickness.shrinkRect(input.margin, fr);

        var framework = state.framework;
        framework.width = 0;
        framework.height = 0;
        helpers.coerceSize(framework, input);

        var stretched = state.stretched;
        stretched.width = fr.width;
        stretched.height = fr.height;
        helpers.coerceSize(stretched, input);

        if (input.horizontalAlignment === HorizontalAlignment.Stretch)
            framework.width = Math.max(framework.width, stretched.width);

        if (input.verticalAlignment === VerticalAlignment.Stretch)
            framework.height = Math.max(framework.height, stretched.height);

        fs.width = Math.max(fs.width, framework.width);
        fs.height = Math.max(fs.height, framework.height);

        return true;
    };
}