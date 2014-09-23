module minerva.def.processdown.tapins {
    //NOTE: Canvas+UserControl doesn't do this
    export var processLayoutClip: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput): boolean {
        if ((input.dirtyFlags & DirtyFlags.LayoutClip) === 0)
            return true;

        var lc = input.layoutClip;
        var vpc = vpinput ? vpinput.compositeLayoutClip : null;
        if (!lc) {
            if (!vpc) {
                output.compositeLayoutClip = null;
            } else {
                output.compositeLayoutClip = new Rect(vpc.x, vpc.y, vpc.width, vpc.height);
            }
        } else {
            output.compositeLayoutClip = new Rect(lc.x, lc.y, lc.width, lc.height);
            if (vpc)
                Rect.intersection(output.compositeLayoutClip, vpc);
        }

        return true;
    };
}