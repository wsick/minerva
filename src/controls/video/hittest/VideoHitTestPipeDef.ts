module minerva.controls.video.hittest {
    export interface IHitTestData extends core.hittest.IHitTestData {
        assets: IVideoUpdaterAssets;
        videoRect: Rect;
    }

    export class VideoHitTestPipeDef extends core.hittest.HitTestPipeDef {
        constructor () {
            super();
            this.replaceTapin('insideChildren', tapins.insideChildren)
                .replaceTapin('canHitInside', tapins.canHitInside)
                .addTapinAfter('insideObject', 'insideStretch', tapins.insideStretch);
        }

        prepare (data: IHitTestData) {
            data.videoRect = data.videoRect || new Rect();
        }
    }
}