module minerva.def.processdown.tapins {
    export var processRenderVisibility: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if ((input.dirtyFlags & DirtyFlags.RenderVisibility) === 0)
            return true;

        //Update bounds
        output.dirtyFlags |= DirtyFlags.Bounds;
        if (vpoutput)
            vpoutput.dirtyFlags |= DirtyFlags.Bounds;

        //Calculate
        if (vpinput) {
            output.totalOpacity = vpinput.totalOpacity * input.opacity;
            output.totalIsRenderVisible = (vpinput.visibility === Visibility.Visible) && (input.visibility === Visibility.Visible);
        } else {
            output.totalOpacity = input.opacity;
            output.totalIsRenderVisible = input.visibility === Visibility.Visible;
        }

        /*
         if (!output.totalIsRenderVisible)
         this._CacheInvalidateHint();
         */

        //Update new bounds
        if (input.totalIsRenderVisible !== output.totalIsRenderVisible)
            output.dirtyFlags |= DirtyFlags.NewBounds;

        return true;
    };
}