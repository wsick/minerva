module minerva.core.helpers {
    export interface ISized {
        width: number;
        height: number;
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
        useLayoutRounding: boolean;
    }
    export function coerceSize (size: ISize, assets: ISized) {
        var cw = Math.max(assets.minWidth, size.width);
        var ch = Math.max(assets.minHeight, size.height);

        if (!isNaN(assets.width))
            cw = assets.width;

        if (!isNaN(assets.height))
            ch = assets.height;

        cw = Math.max(Math.min(cw, assets.maxWidth), assets.minWidth);
        ch = Math.max(Math.min(ch, assets.maxHeight), assets.minHeight);

        if (assets.useLayoutRounding) {
            cw = Math.round(cw);
            ch = Math.round(ch);
        }

        size.width = cw;
        size.height = ch;
    }

    export function copyGrowTransform4 (dest: Rect, src: Rect, thickness: Thickness, projection: number[]) {
        Rect.copyTo(src, dest);
        Thickness.growRect(thickness, dest);
        if (projection)
            Rect.transform4(dest, projection);
    }
}