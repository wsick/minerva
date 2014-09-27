module minerva.tests.mock {
    export function createTree (outItems?: layout.Updater[]) {
        var root = new layout.Updater();

        var child1 = new layout.Updater();
        var gchild1 = new layout.Updater();
        var gchild2 = new layout.Updater();
        var gchild3 = new layout.Updater();

        var child2 = new layout.Updater();
        var gchild4 = new layout.Updater();
        var ggchild1 = new layout.Updater();

        connect(root, [child1, child2]);
        connect(child1, [gchild1, gchild2, gchild3]);
        connect(child2, [gchild4]);
        connect(gchild4, [ggchild1]);

        if (outItems)
            outItems.push(root, child1, gchild1, gchild2, gchild3, child2, gchild4, ggchild1);

        return root;
    }

    function connect (parent: layout.Updater, children: layout.Updater[]) {
        children.forEach(c => c.setVisualParent(parent));
        parent.walk = (dir?: WalkDirection): IWalker<layout.Updater> => {
            var isReverse = dir === WalkDirection.Reverse || dir === WalkDirection.ZReverse;
            var i = isReverse ? children.length : -1;
            return {
                current: undefined,
                step: function (): boolean {
                    (isReverse) ? i-- : i++;
                    this.current = children[i];
                    return this.current !== undefined;
                }
            };
        };
        return this;
    }

    QUnit.module("mock");

    QUnit.test("walkDeep", (assert) => {
        var expected: layout.Updater[] = [];
        var root = createTree(expected);
        var i = 0;
        for (var walker = root.walkDeep(); walker.step(); i++) {
            assert.strictEqual(walker.current, expected[i]);
        }
        assert.strictEqual(i, 8);
    });

    QUnit.test("walkDeep reverse", (assert) => {
        var expected: layout.Updater[] = [];
        var root = createTree(expected);
        expected = [expected[0], expected[5], expected[6], expected[7], expected[1], expected[4], expected[3], expected[2]];
        var i = 0;
        for (var walker = root.walkDeep(WalkDirection.Reverse); walker.step(); i++) {
            assert.strictEqual(walker.current, expected[i]);
        }
        assert.strictEqual(i, 8);
    });
}