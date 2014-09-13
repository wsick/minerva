module minerva {
    export class Size {
        constructor (public width: number = 0, public height: number = 0) {
        }

        static copyTo (src: Size, dest: Size) {
            dest.width = src.width;
            dest.height = src.height;
        }
    }
}