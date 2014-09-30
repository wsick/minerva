module minerva.tests.mock {
    export function createTree (outItems?: core.Updater[]) {
        var root = createUpdater();

        var child1 = createUpdater();
        var gchild1 = createUpdater();
        var gchild2 = createUpdater();
        var gchild3 = createUpdater();

        var child2 = createUpdater();
        var gchild4 = createUpdater();
        var ggchild1 = createUpdater();

        connect(root, [child1, child2]);
        connect(child1, [gchild1, gchild2, gchild3]);
        connect(child2, [gchild4]);
        connect(gchild4, [ggchild1]);

        if (outItems)
            outItems.push(root, child1, gchild1, gchild2, gchild3, child2, gchild4, ggchild1);

        return root;
    }

    function createUpdater (): core.Updater {
        var upd = new core.Updater()
            .setTree()
            .setMeasurePipe()
            .setArrangePipe()
            .setSizingPipe()
            .setProcessDownPipe()
            .setProcessUpPipe()
            .setRenderPipe();
        return upd;
    }

    function connect (parent: core.Updater, children: core.Updater[]) {
        children.forEach(c => c.setVisualParent(parent));
        parent.tree.walk = (dir?: WalkDirection): IWalker<core.Updater> => {
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
        var expected: core.Updater[] = [];
        var root = createTree(expected);
        var i = 0;
        for (var walker = root.walkDeep(); walker.step(); i++) {
            assert.strictEqual(walker.current, expected[i]);
        }
        assert.strictEqual(i, 8);
    });

    QUnit.test("walkDeep reverse", (assert) => {
        var expected: core.Updater[] = [];
        var root = createTree(expected);
        expected = [expected[0], expected[5], expected[6], expected[7], expected[1], expected[4], expected[3], expected[2]];
        var i = 0;
        for (var walker = root.walkDeep(WalkDirection.Reverse); walker.step(); i++) {
            assert.strictEqual(walker.current, expected[i]);
        }
        assert.strictEqual(i, 8);
    });

    QUnit.test("walkDeep skipBranch", (assert) => {
        var expected: core.Updater[] = [];
        var root = createTree(expected);
        expected[1].assets.visibility = Visibility.Collapsed;
        var i = 0;
        for (var walker = root.walkDeep(); walker.step();) {
            if (walker.current.assets.visibility === Visibility.Collapsed) {
                walker.skipBranch();
                continue;
            }
            i++;
        }
        assert.strictEqual(i, 4);
    });
}