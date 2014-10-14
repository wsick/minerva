module minerva.controls.textblock {
    export interface ITextBlockUpdaterTree {
        walk(): IWalker<text.TextUpdater>;
        onChildAttached(child: text.TextUpdater);
        onChildDetached(child: text.TextUpdater);
    }
    export class TextBlockUpdaterTree implements ITextBlockUpdaterTree {
        children: text.TextUpdater[] = [];

        clear () {
            this.children.length = 0;
        }

        walk (): IWalker<text.TextUpdater> {
            var i = -1;
            var children = this.children;
            return {
                current: undefined,
                step: function (): boolean {
                    i++;
                    this.current = children[i];
                    return this.current !== undefined;
                }
            };
        }

        onChildAttached (child: text.TextUpdater, index?: number) {
            if (index == null || index < 0 || index >= this.children.length)
                this.children.push(child);
            else
                this.children.splice(index, 0, child);
        }

        onChildDetached (child: text.TextUpdater) {
            var index = this.children.indexOf(child);
            if (index > -1)
                this.children.splice(index, 1);
        }
    }
}