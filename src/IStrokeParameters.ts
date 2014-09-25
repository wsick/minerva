module minerva {
    //NOTE: HTML5 Canvas does not support start and end cap.
    export interface IStrokeParameters {
        thickness: number;
        join: PenLineJoin;
        startCap: PenLineCap;
        endCap: PenLineCap;
        miterLimit: number;
    }

    export enum PenLineJoin {
        Miter = 0,
        Bevel = 1,
        Round = 2,
    }

    export enum PenLineCap {
        Flat = 0,
        Square = 1,
        Round = 2,
        Triangle = 3,
    }
}
