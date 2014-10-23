module minerva.text.layout {
    export class Run {
        attrs: ITextAssets;
        text: string = "";
        start: number = 0;
        length: number = 0;
        width: number = 0;

        pre: Cluster;
        sel: Cluster;
        post: Cluster;

        static splitSelection (run: Run, start: number, end: number, measureWidth: (text: string, assets: ITextAssets) => number) {
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