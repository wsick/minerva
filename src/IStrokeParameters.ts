module minerva {
    //NOTE: HTML5 Canvas does not support start and end cap.
    export interface IStrokeParameters {
        thickness: number;
        join: PenLineJoin;
        startCap: PenLineCap;
        endCap: PenLineCap;
        miterLimit: number;
    }
}