module minerva.controls.panel.measure {
    export class PanelMeasurePipeDef extends core.measure.MeasurePipeDef {
        constructor() {
            super();
            this.replaceTapin('doOverride', doOverride);
        }
    }

    function doOverride(input: core.measure.IInput, state: core.measure.IState, output: core.measure.IOutput, tree: core.IUpdaterTree, availableSize: Size): boolean {
        var desired = output.desiredSize;
        desired.width = desired.height = 0;
        for (var walker = tree.walk(); walker.step();) {
            walker.current.measure(state.availableSize);
            var childds = walker.current.assets.desiredSize;
            desired.width = Math.max(desired.width, childds.width);
            desired.height = Math.max(desired.height, childds.height);
        }
        return true;
    }
}