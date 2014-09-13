module minerva.def.helpers {
    export interface ISized {
        width: number;
        height: number;
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
        useLayoutRounding: boolean;
    }
    export function coerceSize (size: Size, assets: ISized) {
        var cw = Math.max(assets.minWidth, assets.width);
        var ch = Math.max(assets.minHeight, assets.height);

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
}