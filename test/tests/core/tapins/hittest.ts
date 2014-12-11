module minerva.core.hittest.tapins.tests {
    QUnit.module("Hit Test Pipe Tapins");

    var mock = {
        updater: function (): Updater {
            return new Updater();
        },
        data: function (upd: Updater): IHitTestData {
            return {
                assets: upd.assets,
                tree: upd.tree,
                updater: upd,
                hitChildren: false,
                bounds: new Rect(),
                layoutClipBounds: new Rect()
            };
        },
        ctx: function (): render.RenderContext {
            return new render.RenderContext(document.createElement('canvas').getContext('2d'));
        },
        walk: function (children: Updater[]): (direction?: WalkDirection) => IWalker<Updater> {
            children.push(mock.updater());
            children.push(mock.updater());
            return (direction ?: WalkDirection): IWalker<Updater> => {
                var isReverse = (direction === WalkDirection.Reverse || direction === WalkDirection.ZReverse);
                var i = -1;
                if (isReverse) {
                    i = children.length;
                    return {
                        current: undefined,
                        step: function (): boolean {
                            i--;
                            this.current = children[i];
                            return this.current !== undefined;
                        }
                    };
                } else {
                    return {
                        current: undefined,
                        step: function (): boolean {
                            i++;
                            this.current = children[i];
                            return this.current !== undefined;
                        }
                    };
                }
            };
        }
    };

    function typedToArray (typed) {
        var arr = [];
        for (var i = 0; i < typed.length; i++) {
            arr.push(typed[i]);
        }
        return arr;
    }

    QUnit.test("canHit", (assert) => {
        var updater = mock.updater();
        var data = mock.data(updater);
        var pos = new Point();
        var hitList: Updater[] = [];
        var ctx = mock.ctx();

        data.assets.totalIsRenderVisible = false;
        data.assets.totalIsHitTestVisible = false;
        assert.ok(!tapins.canHit(data, pos, hitList, ctx, false));

        data.assets.totalIsRenderVisible = true;
        assert.ok(!tapins.canHit(data, pos, hitList, ctx, false));

        data.assets.totalIsHitTestVisible = true;
        assert.ok(tapins.canHit(data, pos, hitList, ctx, false));
    });

    QUnit.test("prepareCtx", (assert) => {
        var updater = mock.updater();
        var data = mock.data(updater);
        var pos = new Point();
        var hitList: Updater[] = [];
        var ctx = mock.ctx();

        var saved = false;
        ctx.save = function () {
            saved = true;
        };

        ctx.translate(10, 20);

        mat3.init(data.assets.renderXform, 2, 0, 0, 4, 0, 0);

        assert.ok(tapins.prepareCtx(data, pos, hitList, ctx, false));
        assert.strictEqual(saved, true);
        assert.deepEqual(typedToArray(ctx.currentTransform), [2, 0, 10, 0, 4, 20, 0, 0, 1]);
    });

    QUnit.test("insideClip", (assert) => {
        var updater = mock.updater();
        var data = mock.data(updater);
        var pos = new Point();
        var hitList: Updater[] = [];
        var ctx = mock.ctx();

        var restored = false;
        ctx.restore = function () {
            restored = true;
        };

        //No clip
        assert.ok(tapins.insideClip(data, pos, hitList, ctx, false));
        assert.strictEqual(restored, false);

        //Outside clip bounds
        pos.x = 75;
        pos.y = 5;
        data.assets.clip = {
            GetBounds: function () {
                return new Rect(0, 0, 50, 50);
            },
            Draw: function (ctx: render.RenderContext) {
                ctx.raw.rect(0, 10, 50, 40);
            }
        };
        assert.ok(!tapins.insideClip(data, pos, hitList, ctx, false));
        assert.strictEqual(restored, true);
        restored = false;

        //Outside clip path
        ctx.translate(50, 0);
        assert.ok(!tapins.insideClip(data, pos, hitList, ctx, false));
        assert.strictEqual(restored, true);
        restored = false;

        //Inside
        ctx.translate(0, -10);
        assert.ok(tapins.insideClip(data, pos, hitList, ctx, false));
        assert.strictEqual(restored, false);
    });

    QUnit.test("insideChildren", (assert) => {
        var updater = mock.updater();
        var data = mock.data(updater);
        var pos = new Point();
        var hitList: Updater[] = [];
        var ctx = mock.ctx();

        assert.ok(tapins.insideChildren(data, pos, hitList, ctx, false));
        assert.strictEqual(hitList.length, 1);
        assert.strictEqual(hitList[0], updater);
        assert.strictEqual(data.hitChildren, false);

        hitList = [];
        var children: Updater[] = [];
        data.tree.walk = mock.walk(children);
        children[0].hitTest = function (pos2, hitList2, ctx2, includeAll) {
            hitList.unshift(children[0]);
            return true;
        };
        children[1].hitTest = function (pos2, hitList2, ctx2, includeAll) {
            hitList.unshift(children[1]);
            return true;
        };
        assert.ok(tapins.insideChildren(data, pos, hitList, ctx, false));
        assert.strictEqual(hitList.length, 2);
        assert.strictEqual(hitList[0], children[1]);
        assert.strictEqual(hitList[1], updater);
        assert.strictEqual(data.hitChildren, true);

        data.hitChildren = false;
        hitList = [];
        assert.ok(tapins.insideChildren(data, pos, hitList, ctx, true));
        assert.strictEqual(hitList.length, 3);
        assert.strictEqual(hitList[0], children[0]);
        assert.strictEqual(hitList[1], children[1]);
        assert.strictEqual(hitList[2], updater);
        assert.strictEqual(data.hitChildren, true);
    });

    QUnit.test("canHitInside", (assert) => {
        var updater = mock.updater();
        var data = mock.data(updater);
        var pos = new Point();
        var hitList: Updater[] = [updater];
        var ctx = mock.ctx();

        var restored = false;
        ctx.restore = function () {
            restored = true;
        };

        data.hitChildren = true;
        assert.ok(tapins.canHitInside(data, pos, hitList, ctx, false));
        assert.strictEqual(restored, false);
        assert.strictEqual(hitList.length, 1);

        data.hitChildren = false;
        assert.ok(!tapins.canHitInside(data, pos, hitList, ctx, false));
        assert.strictEqual(restored, true);
        assert.strictEqual(hitList.length, 0);
    });

    QUnit.test("insideObject", (assert) => {
        var updater = mock.updater();
        var data = mock.data(updater);
        var pos = new Point();
        var hitList: Updater[] = [updater];
        var ctx = mock.ctx();

        var restored = false;
        ctx.restore = function () {
            restored = true;
        };

        data.hitChildren = true;
        assert.ok(tapins.insideObject(data, pos, hitList, ctx, false));
        assert.strictEqual(hitList.length, 1);
        assert.strictEqual(restored, false);

        data.hitChildren = false;
        data.assets.extents = new Rect(0, 0, 100, 100);
        ctx.translate(0, 0);
        pos.x = 10;
        pos.y = 10;
        assert.ok(tapins.insideObject(data, pos, hitList, ctx, false));
        assert.strictEqual(hitList.length, 1);
        assert.strictEqual(restored, false);

        ctx.translate(100, 100);
        assert.ok(!tapins.insideObject(data, pos, hitList, ctx, false));
        assert.strictEqual(hitList.length, 0);
        assert.strictEqual(restored, true);
    });

    QUnit.test("insideLayoutClip", (assert) => {
        var updater = mock.updater();
        var data = mock.data(updater);
        var pos = new Point();
        var hitList: Updater[] = [updater];
        var ctx = mock.ctx();

        var restored = false;
        ctx.restore = function () {
            restored = true;
        };

        //Hit children
        data.assets.compositeLayoutClip = null;
        data.hitChildren = true;
        assert.ok(tapins.insideLayoutClip(data, pos, hitList, ctx, false));
        assert.strictEqual(hitList.length, 1);
        assert.strictEqual(restored, false);

        //No layout clip
        data.hitChildren = false;
        assert.ok(tapins.insideLayoutClip(data, pos, hitList, ctx, false));
        assert.strictEqual(hitList.length, 1);
        assert.strictEqual(restored, false);

        //Empty layout clip
        var clc = data.assets.compositeLayoutClip = new Rect();
        assert.ok(tapins.insideLayoutClip(data, pos, hitList, ctx, false));
        assert.strictEqual(hitList.length, 1);
        assert.strictEqual(restored, false);

        //Inside layout clip
        clc.width = 50;
        clc.height = 50;
        pos.x = 25;
        pos.y = 15;
        assert.ok(tapins.insideLayoutClip(data, pos, hitList, ctx, false));
        assert.strictEqual(hitList.length, 1);
        assert.strictEqual(restored, false);

        //Not inside layout clip
        ctx.translate(0, 40);
        assert.ok(!tapins.insideLayoutClip(data, pos, hitList, ctx, false));
        assert.strictEqual(hitList.length, 0);
        assert.strictEqual(restored, true);
    });

    QUnit.test("completeCtx", (assert) => {
        var updater = mock.updater();
        var data = mock.data(updater);
        var pos = new Point();
        var hitList: Updater[] = [updater];
        var ctx = mock.ctx();

        var restored = false;
        ctx.restore = function () {
            restored = true;
        };

        assert.ok(tapins.completeCtx(data, pos, hitList, ctx, false));
        assert.strictEqual(hitList.length, 1);
        assert.strictEqual(restored, true);
    });
}