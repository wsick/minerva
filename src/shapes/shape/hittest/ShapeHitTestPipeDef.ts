module minerva.shapes.shape.hittest {
    export interface IHitTestData extends core.hittest.IHitTestData {
        assets: IShapeUpdaterAssets;
    }

    export class ShapeHitTestPipeDef extends core.hittest.HitTestPipeDef {
        constructor () {
            super();
            this.replaceTapin('canHitInside', tapins.canHitInside)
                .addTapinAfter('insideObject', 'canHitShape', tapins.canHitShape)
                .addTapinAfter('canHitShape', 'insideShape', tapins.insideShape);
        }
    }
}