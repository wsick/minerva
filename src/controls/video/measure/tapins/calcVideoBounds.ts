module minerva.controls.video.measure.tapins {
    export function calcVideoBounds (input: IInput, state: IState, output: core.measure.IOutput, tree: core.IUpdaterTree, availableSize: Size): boolean {
        var ib = state.videoBounds;
        ib.x = ib.y = ib.width = ib.height = 0;
        if (!input.source)
            return true;
        ib.width = input.source.pixelWidth;
        ib.height = input.source.pixelHeight;
        return true;
    }
}