module minerva.controls.usercontrol {
    export interface IUserControlUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput {
    }

    export class UserControlUpdater extends controls.control.ControlUpdater {
        assets: IUserControlUpdaterAssets;

        init () {
            this.setMeasurePipe(singleton(measure.UserControlMeasurePipeDef))
                .setArrangePipe(singleton(arrange.UserControlArrangePipeDef));

            //TODO: Use for layout clip rendering
            //this.BreaksLayoutClipRender = true;

            var assets = this.assets;
            assets.padding = new Thickness();
            assets.borderThickness = new Thickness();

            super.init();
        }
    }
}