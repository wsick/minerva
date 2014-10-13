module minerva.text.layout {
    export class Line {
        runs: Run[] = [];
        width: number = 0;
        height: number = 0;

        static getLineFromY (lines: Line[], y: number) {
            var line: layout.Line;
            for (var i = 0, oy = 0.0; i < lines.length; i++) {
                line = lines[i];
                oy += line.height;
                if (y < oy)
                    return line;
            }
            return lines[lines.length - 1];
        }
    }
}