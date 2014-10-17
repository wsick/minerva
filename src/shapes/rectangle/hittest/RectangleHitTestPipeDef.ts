/// <reference path="../../shape/hittest/ShapeHitTestPipeDef" />

module minerva.shapes.rectangle.hittest {
    export interface IHitTestData extends shape.hittest.IHitTestData {
        assets: IRectangleUpdaterAssets;
    }

    export class RectangleHitTestPipeDef extends shape.hittest.ShapeHitTestPipeDef {
        constructor () {
            super();
            this.replaceTapin('insideShape', tapins.insideShape);
        }
    }
}