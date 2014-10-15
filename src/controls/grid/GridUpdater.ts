module minerva.controls.grid {
    export interface IGridUpdaterAssets extends panel.IPanelUpdaterAssets, render.IInput {
    }

    export class GridUpdater extends panel.PanelUpdater {
        assets: IGridUpdaterAssets;

        init () {
            this.setRenderPipe(singleton(render.GridRenderPipeDef));

            var assets = this.assets;
            assets.showGridLines = false;
            assets.columnDefinitions = [];
            assets.rowDefinitions = [];

            super.init();
        }
    }
}