module minerva.controls.panel {
    export class PanelUpdater extends core.Updater {
        init() {
            this.setMeasurePipe(singleton(panel.measure.PanelMeasurePipeDef))
                .setArrangePipe(singleton(panel.arrange.PanelArrangePipeDef));
            super.init();
        }
    }
}