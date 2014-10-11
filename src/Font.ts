/// <reference path="Enums.ts" />

module minerva {
    var FontStyle = {
        Normal: "normal",
        Italic: "italic",
        Oblique: "oblique"
    };
    var FontStretch = {
        UltraCondensed: "ultra-condensed",
        ExtraCondensed: "extra-condensed",
        Condensed: "condensed",
        SemiCondensed: "semi-condensed",
        Normal: "normal",
        SemiExpanded: "semi-expanded",
        Expanded: "expanded",
        ExtraExpanded: "extra-expanded",
        UltraExpanded: "ultra-expanded"
    };

    export class Font {
        static DEFAULT_FAMILY = "Segoe UI, Lucida Sans Unicode, Verdana";
        static DEFAULT_STRETCH = FontStretch.Normal;
        static DEFAULT_STYLE = FontStyle.Normal;
        static DEFAULT_WEIGHT = FontWeight.Normal;
        static DEFAULT_SIZE = 14;

        family: string = Font.DEFAULT_FAMILY;
        size: number = Font.DEFAULT_SIZE;
        stretch: string = Font.DEFAULT_STRETCH;
        style: string = Font.DEFAULT_STYLE;
        weight: FontWeight = Font.DEFAULT_WEIGHT;

        static mergeInto (font: Font, family: string, size: number, stretch: string, style: string, weight: FontWeight): boolean {
            var changed = font.family !== family
                || font.size !== size
                || font.stretch !== stretch
                || font.style !== style
                || font.weight !== weight;
            font.family = family;
            font.size = size;
            font.stretch = stretch;
            font.style = style;
            font.weight = weight;
            return changed;
        }
    }
}