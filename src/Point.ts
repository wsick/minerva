module minerva {
    export interface IPoint {
        x: number;
        y: number;
    }

    export class Point implements IPoint {
        x: number;
        y: number;

        constructor (x?: number, y?: number) {
            this.x = x == null ? 0 : x;
            this.y = y == null ? 0 : y;
        }
    }
}