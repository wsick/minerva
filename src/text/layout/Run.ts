module minerva.text.layout {
    export class Run {
        attrs: ITextAttributes;
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

        static splitSelection (run: Run, start: number, end: number, measureWidth: (text: string, attrs: ITextAttributes) => number) {
            run.pre = run.sel = run.post = null;

            var rs = run.start;
            var re = rs + run.length;

            var prelen = Math.min(run.length, Math.max(0, start - rs));
            if (prelen > 0) {
                var pre = run.pre = new Cluster();
                pre.text = run.text.substr(0, prelen);
                pre.width = measureWidth(pre.text, run.attrs);
            }

            var postlen = Math.min(run.length, Math.max(0, re - end));
            if (postlen > 0) {
                var post = run.post = new Cluster();
                post.text = run.text.substr(run.length - postlen);
                post.width = measureWidth(post.text, run.attrs);
            }

            var ss = Math.min(re, Math.max(rs, start));
            var se = Math.max(rs, Math.min(re, end));
            var sellen = Math.max(0, se - ss);
            if (sellen > 0) {
                var sel = run.sel = new Cluster();
                sel.isSelected = true;
                sel.text = run.text.substr(ss - rs, sellen);
                sel.width = measureWidth(sel.text, run.attrs);
            }
        }
    }
}