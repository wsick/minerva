/// <reference path="../../qunit" />
/// <reference path="../../lib/minerva/minerva" />

module minerva.tests.render.tapins {
    QUnit.module("Render Pipe Tapins");

    import render = minerva.def.render;
    import tapins = minerva.def.render.tapins;
    import Rect = minerva.Rect;
    import RenderContext = minerva.def.render.RenderContext;

    function typedToArray (typed) {
        var arr = [];
        for (var i = 0; i < typed.length; i++) {
            arr.push(typed[i]);
        }
        return arr;
    }

    var mock = {
        input: function (): render.IInput {
            return <render.IInput> {
                totalIsRenderVisible: true,
                totalOpacity: 1.0,
                surfaceBoundsWithChildren: new Rect(),
                renderXform: mat3.identity(),
                clip: null,
                effect: null
            };
        },
        state: function (): render.IState {
            return <render.IState> {
                renderRegion: new Rect()
            };
        }
    };

    class MockRenderContext extends RenderContext {
        saved = false;

        save () {
            super.save();
            this.saved = true;
        }

        restored = false;

        restore () {
            super.restore();
            this.restored = true;
        }
    }

    QUnit.test("validate", (assert) => {
        var input = mock.input();
        var state = mock.state();

        assert.ok(tapins.validate(input, state, null, null, null), "#1");

        input.totalIsRenderVisible = false;
        assert.ok(!tapins.validate(input, state, null, null, null), "#2");

        input.totalIsRenderVisible = true;
        input.totalOpacity = 0.002;
        assert.ok(tapins.validate(input, state, null, null, null), "#3");

        input.totalOpacity = 0.0018;
        assert.ok(!tapins.validate(input, state, null, null, null), "#4");
    });

    QUnit.test("validateRegion", (assert) => {
        var input = mock.input();
        input.surfaceBoundsWithChildren = new Rect(50, 50, 100, 100);
        var state = mock.state();

        assert.ok(tapins.validateRegion(input, state, null, null, new Rect(0, 0, 100, 200)), "#1");
        var rr = state.renderRegion;
        assert.equal(rr.x, 50);
        assert.equal(rr.y, 50);
        assert.equal(rr.width, 50);
        assert.equal(rr.height, 100);


        assert.ok(!tapins.validateRegion(input, state, null, null, new Rect(0, 0, 50, 150)), "#2");
        assert.equal(rr.x, 50);
        assert.equal(rr.y, 50);
        assert.equal(rr.width, 0);
        assert.equal(rr.height, 100);

        assert.ok(!tapins.validateRegion(input, state, null, null, new Rect(100, 150, 25, 10)), "#3");
        assert.equal(rr.x, 100);
        assert.equal(rr.y, 150);
        assert.equal(rr.width, 25);
        assert.equal(rr.height, 0);
    });

    QUnit.test("prepareContext", (assert) => {
        var input = mock.input();
        var state = mock.state();

        var canvas = document.createElement('canvas');
        var rctx = new RenderContext(canvas.getContext('2d'));
        assert.equal(rctx.raw.globalAlpha, 1.0);

        rctx.scale(2, 4);
        mat3.createTranslate(10, 15, input.renderXform);
        input.totalOpacity = 0.5;
        tapins.prepareContext(input, state, null, rctx, new Rect(), "#4");
        assert.equal(rctx.raw.globalAlpha, 0.5);
        assert.deepEqual(typedToArray(rctx.currentTransform), [2, 0, 20, 0, 4, 60, 0, 0, 1]);
        rctx.restore();
        assert.equal(rctx.raw.globalAlpha, 1.0);
        assert.deepEqual(typedToArray(rctx.currentTransform), [2, 0, 0, 0, 4, 0, 0, 0, 1]);
    });

    QUnit.test("applyClip", (assert) => {
        var input = mock.input();
        var state = mock.state();

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var rctx = new RenderContext(ctx);

        var clipDrawn = false;
        input.clip = <minerva.def.render.IGeometry>{
            Draw: function (ctx: RenderContext) {
                clipDrawn = true;
            }
        };

        var clipped = false;
        ctx.clip = function () {
            clipped = true;
        };

        assert.ok(tapins.applyClip(input, state, null, rctx, new Rect(), "#1"));
        assert.ok(clipDrawn, "#2");
        assert.ok(clipped, "#3");
    });

    QUnit.test("preRender", (assert) => {
        var input = mock.input();
        var state = mock.state();

        var canvas = document.createElement('canvas');
        var rctx = new MockRenderContext(canvas.getContext('2d'));

        input.effect = <minerva.def.render.IEffect> {
            PreRender: function (ctx: RenderContext) {
                ctx.raw.globalAlpha = 0.5;
            },
            PostRender: function (ctx: RenderContext) {

            }
        };
        assert.ok(tapins.preRender(input, state, null, rctx, new Rect(), "#1"));
        assert.ok(rctx.saved);
        assert.equal(rctx.raw.globalAlpha, 0.5);
        rctx.restore();
        assert.equal(rctx.raw.globalAlpha, 1.0);

        rctx.saved = false;
        input.effect = null;
        assert.ok(tapins.preRender(input, state, null, rctx, new Rect(), "#2"));
        assert.ok(!rctx.saved);
    });

    QUnit.test("doRender", (assert) => {
        ok(true);
    });

    QUnit.test("postRender", (assert) => {
        var input = mock.input();
        var state = mock.state();

        var canvas = document.createElement('canvas');
        var rctx = new MockRenderContext(canvas.getContext('2d'));

        input.effect = <minerva.def.render.IEffect> {
            PreRender: function (ctx: RenderContext) {
            },
            PostRender: function (ctx: RenderContext) {
                ctx.raw.globalAlpha = 0.5;
            }
        };
        rctx.save();
        assert.ok(tapins.postRender(input, state, null, rctx, new Rect(), "#1"));
        assert.ok(rctx.restored);
        assert.equal(rctx.raw.globalAlpha, 1.0);

        rctx.restored = false;
        input.effect = null;
        assert.ok(tapins.postRender(input, state, null, rctx, new Rect(), "#2"));
        assert.ok(!rctx.restored);
    });

    QUnit.test("renderChildren", (assert) => {
        ok(true);
    });

    QUnit.test("restoreContext", (assert) => {
        var input = mock.input();
        var state = mock.state();

        var canvas = document.createElement('canvas');
        var rctx = new MockRenderContext(canvas.getContext('2d'));

        assert.ok(tapins.restoreContext(input, state, null, rctx, new Rect(), "#1"));
        assert.ok(rctx.restored);
    });
}