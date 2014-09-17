module minerva {
    export interface ISize {
        width: number;
        height: number;
    }

    export class Size implements ISize {
        width: number;
        height: number;

        constructor (width?: number, height?: number) {
            this.width = width == null ? 0 : width;
            this.height = height == null ? 0 : height;
        }

        static copyTo (src: ISize, dest: ISize) {
            dest.width = src.width;
            dest.height = src.height;
        }

        static isEqual (size1: ISize, size2: ISize): boolean {
            return size1.width === size2.width
                && size1.height === size2.height;
        }
    }
}