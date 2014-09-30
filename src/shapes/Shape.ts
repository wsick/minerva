module minerva.shapes {
    var caps: string[] = [
        "butt", //flat
        "square", //square
        "round", //round
        "butt" //triangle
    ];
    var joins: string[] = [
        "miter",
        "bevel",
        "round"
    ];
    export class Shape implements core.IShape {
        stretch = Stretch.None;
        fill: IBrush = null;
        fillRule = FillRule.EvenOdd;
        stroke: IBrush = null;
        strokeThickness = 0;
        strokeStartLineCap = PenLineCap.Flat;
        strokeEndLineCap = PenLineCap.Flat;
        strokeLineJoin = PenLineJoin.Miter;
        strokeMiterLimit = 10;

        actualWidth: number = NaN;
        actualHeight: number = NaN;

        draw (ctx: core.render.RenderContext): core.IShape {
            return this;
        }

        doFill (ctx: core.render.RenderContext, region: Rect): core.IShape {
            ctx.fillEx(this.fill, region, this.fillRule);
            return this;
        }

        doStroke (ctx: core.render.RenderContext, region: Rect): core.IShape {
            if (!this.stroke || !(this.strokeThickness > 0))
                return this;
            var raw = ctx.raw;
            raw.lineWidth = this.strokeThickness;
            raw.lineCap = caps[this.strokeStartLineCap || this.strokeEndLineCap || 0] || caps[0];
            raw.lineJoin = joins[this.strokeLineJoin || 0] || joins[0];
            raw.miterLimit = this.strokeMiterLimit;

            this.stroke.setupBrush(raw, region);
            raw.strokeStyle = this.stroke.toHtml5Object();
            raw.stroke();
        }
    }
}