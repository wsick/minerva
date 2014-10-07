module minerva.controls.usercontrol {
    export class UserControlUpdater extends controls.control.ControlUpdater {
        tree: UserControlUpdaterTree;

        init () {
            this.setTree(new UserControlUpdaterTree())
                .setMeasurePipe()
                .setArrangePipe();
            super.init();
        }
    }
}