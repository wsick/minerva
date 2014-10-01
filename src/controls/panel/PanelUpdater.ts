module minerva.controls.panel {
    export class PanelUpdater extends core.Updater {
        constructor() {
            super();
            this.setTree()
                .setProcessDownPipe(singleton(panel.processdown.PanelProcessDownPipeDef))
                .setProcessUpPipe()
                .setMeasurePipe(singleton(panel.measure.PanelMeasurePipeDef))
                .setArrangePipe(singleton(panel.arrange.PanelArrangePipeDef));
        }
    }
}