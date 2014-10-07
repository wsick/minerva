module minerva.controls.scrollcontentpresenter.arrange.tapins {
    export function updateClip (input: IInput, state: IState, output: core.arrange.IOutput, tree: ScrollContentPresenterUpdaterTree, availableSize: Size): boolean {
        //TODO: Implement
        /*
         if (!this._IsClipPropertySet) {
         this._ClippingRectangle = new Media.RectangleGeometry();
         this.Clip = this._ClippingRectangle;
         this._IsClipPropertySet = true;
         }

         var content;
         if (this.TemplateOwner instanceof Controls.ScrollViewer && (content = this.Content) && (content instanceof Controls.Internal.TextBoxView || content instanceof Controls._RichTextBoxView)) {
         //ScrollViewer inside TextBox/RichTextBox
         this._ClippingRectangle.Rect = this._CalculateTextBoxClipRect(arrangeSize);
         } else {
         minerva.Size.copyTo(arrangeSize, this._ClippingRectangle.Rect = new minerva.Rect());
         }
         */

        return true;
    }

    /*
    function _CalculateTextBoxClipRect (arrangeSize: minerva.Size): minerva.Rect {
        var left = 0;
        var right = 0;
        var sd = this._ScrollData;
        var width = sd.ExtentWidth;
        var num = sd.ViewportWidth;
        var x = sd.OffsetX;
        var templatedParent: ScrollViewer;
        if (this.TemplateOwner instanceof ScrollViewer)
            templatedParent = <ScrollViewer>this.TemplateOwner;

        var to = templatedParent.TemplateOwner;
        var textWrapping = TextWrapping.NoWrap;
        var horizontalScrollBarVisibility = ScrollBarVisibility.Disabled;
        if (to instanceof TextBox) {
            var textbox = <TextBox>to;
            textWrapping = textbox.TextWrapping;
            horizontalScrollBarVisibility = textbox.HorizontalScrollBarVisibility;
        } else if (to instanceof RichTextBox) {
            var richtextbox = <RichTextBox>to;
            textWrapping = richtextbox.TextWrapping;
            horizontalScrollBarVisibility = richtextbox.HorizontalScrollBarVisibility;
        }

        var padding = templatedParent.Padding;
        if (textWrapping !== TextWrapping.Wrap) {
            if (num > width || x === 0)
                left = padding.left + 1;
            if (num > width || horizontalScrollBarVisibility !== ScrollBarVisibility.Disabled && Math.abs(width - x + num) <= 1)
                right = padding.right + 1;
        } else {
            left = padding.left + 1;
            right = padding.right + 1;
        }
        left = Math.max(0, left);
        right = Math.max(0, right);
        return new minerva.Rect(-left, 0, arrangeSize.width + left + right, arrangeSize.height);
    }
    */
}