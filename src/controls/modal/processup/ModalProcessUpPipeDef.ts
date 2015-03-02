module minerva.controls.modal.processup {
    export class ModalProcessUpPipeDef extends core.processup.ProcessUpPipeDef {
        constructor () {
            super();
            this.removeTapin('calcActualSize')
                .removeTapin('calcExtents')
                .removeTapin('calcPaintBounds');
        }
    }
}