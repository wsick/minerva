module minerva.controls.control {
    export class ControlUpdater extends core.Updater {
        init () {
            this.setTree(new ControlUpdaterTree());

            //TODO: Use for hit-testing
            //this.assets.isNeverInsideObject = true;

            super.init();
        }
    }
}