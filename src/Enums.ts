module minerva {
    export enum Orientation {
        Horizontal = 0,
        Vertical = 1,
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

    export enum FillRule {
        EvenOdd = 0,
        NonZero = 1,
    }

    export enum Stretch {
        None = 0,
        Fill = 1,
        Uniform = 2,
        UniformToFill = 3,
    }
}
