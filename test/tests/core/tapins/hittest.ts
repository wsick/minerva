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
        assert.ok(!tapins.canHit(data, pos, hitList, ctx));

        data.assets.totalIsRenderVisible = true;
        assert.ok(!tapins.canHit(data, pos, hitList, ctx));

        data.assets.totalIsHitTestVisible = true;
        assert.ok(tapins.canHit(data, pos, hitList, ctx));
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

        mat3.set([2, 0, 0, 0, 4, 0, 0, 0, 1], data.assets.renderXform);

        assert.ok(tapins.prepareCtx(data, pos, hitList, ctx));
        assert.strictEqual(saved, true);
        assert.deepEqual(typedToArray(ctx.currentTransform), [2, 0, 10, 0, 4, 20, 0, 0, 1]);
    });

    QUnit.test("insideClip", (assert) => {

        assert.ok(true);
    });

    QUnit.test("insideChildren", (assert) => {

        assert.ok(true);
    });

    QUnit.test("canHitInside", (assert) => {

        assert.ok(true);
    });

    QUnit.test("insideObject", (assert) => {

        assert.ok(true);
    });

    QUnit.test("insideLayoutClip", (assert) => {

        assert.ok(true);
    });

    QUnit.test("completeCtx", (assert) => {

        assert.ok(true);
    });
}