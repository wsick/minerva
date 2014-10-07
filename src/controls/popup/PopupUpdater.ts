module minerva.controls.popup {
    export class PopupUpdater extends core.Updater {
        init() {
            this.setProcessDownPipe(singleton(processdown.PopupProcessDownPipeDef))
                .setProcessUpPipe(singleton(processup.PopupProcessUpPipeDef));
            super.init();
        }
    }
}