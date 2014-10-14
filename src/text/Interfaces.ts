module minerva.text {
    export interface ITextLayoutContext {
        text: string;
        selectionStart: number;
        selectionLength: number;
        textWrapping: TextWrapping;
        textAlignment: TextAlignment;
        lineStackingStrategy: LineStackingStrategy;
        lineHeight: number;
    }
    export interface ITextAttributes {
        background: IBrush;
        selectionBackground: IBrush;
        foreground: IBrush;
        selectionForeground: IBrush;
        isUnderlined: boolean;
        font: Font;
    }
    export interface ITextLayoutAssets {
        availableWidth: number;
        actualWidth: number;
        actualHeight: number;
        wrapped: boolean;
        maxWidth: number;
        maxHeight: number;
        lines: layout.Line[];
        selCached: boolean;
    }

    export interface ITextLayoutPass {
        text: string;
        index: number;
        max: number;
    }
}