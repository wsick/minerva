module minerva.controls.image.hittest {
    export interface IHitTestData extends core.hittest.IHitTestData {
        assets: IImageUpdaterAssets;
    }

    export class ImageHitTestPipeDef extends core.hittest.HitTestPipeDef {
        constructor () {
            super();
            this.replaceTapin('canHitInside', tapins.canHitInside)
                .addTapinAfter('insideObject', 'insideStretch', tapins.insideStretch);
        }
    }
}