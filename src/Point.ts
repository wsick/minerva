module minerva {
    export class Point {
        x: number;
        y: number;

        constructor (x?: number, y?: number) {
            this.x = x == null ? 0 : x;
            this.y = y == null ? 0 : y;
        }
    }
}