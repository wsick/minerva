module minerva.text.layout {
    export interface IAttributes {
        background: IBrush;
        selectionBackground: IBrush;
        foreground: IBrush;
        selectionForeground: IBrush;
        isUnderlined: boolean;
        font: Font;
    }
}