module minerva.text.layout {
    export class Run {
        attrs: IAttributes;
        text: string = null;
        start: number = 0;
        length: number = 0;
        width: number = 0;

        pre: Cluster = null;
        sel: Cluster = null;
        post: Cluster = null;

        static getCursorFromX (runs: Run[], x: number): number {
            return 0;
            //TODO: Implement getCursorFromX
            /*
             var runs = this.$$runs;

             var run: Run = null;
             var cursor = this._Offset;
             var text = layout.Text;
             var index = this._Start;
             var end: number = 0;
             var c: string = null;

             var x0 = x;

             var i: number;
             for (i = 0; i < runs.length; i++) {
             run = runs[i];
             if (x < (x0 + run.width))
             break; // x is somewhere inside this run

             cursor += run._Length;
             index += run._Length;
             x0 += run._Advance;
             run = null;
             }

             if (run != null) {
             index = run._Start;
             end = run._Start + run._Length;
             var font = run._Attrs.Font;
             var m: number = 0;
             var ch: number = 0;
             while (index < end) {
             ch = index;
             cursor++;
             c = text.charAt(index);
             index++;
             if (c === '\t')
             c = ' ';
             m = Surface.MeasureWidth(c, font);
             if (x <= x0 + (m / 2.0)) {
             index = ch;
             cursor--;
             break;
             }
             x0 += m;
             }
             } else if (i > 0) {
             // x is beyond the end of the last run
             run = runs[i - 1];
             end = run._Start + run._Length;
             index = run._Start;
             c = end - 1 < 0 ? null : text.charAt(end - 1);
             if (c == '\n') {
             cursor--;
             end--;
             c = end - 1 < 0 ? null : text.charAt(end - 1);
             if (c == '\r') {
             cursor--;
             end--;
             }
             }
             }
             return cursor;
             */
        }
    }
}