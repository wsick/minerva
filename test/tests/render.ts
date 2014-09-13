/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/minerva/minerva" />

QUnit.module("render");

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
    assets: function (): render.IAssets {
        return <render.IAssets> {
            TotalIsRenderVisible: true,
            TotalOpacity: 1.0,
            SurfaceBoundsWithChildren: new Rect(),
            RenderXform: mat3.identity(),
            Clip: null,
            Effect: null
        };
    },
    state: function (): render.IState {
        return <render.IState> {
            RenderRegion: new Rect()
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
    var assets = mock.assets();
    var state = mock.state();

    assert.ok(tapins.validate(assets, state, null, null, null), "#1");

    assets.TotalIsRenderVisible = false;
    assert.ok(!tapins.validate(assets, state, null, null, null), "#2");

    assets.TotalIsRenderVisible = true;
    assets.TotalOpacity = 0.002;
    assert.ok(tapins.validate(assets, state, null, null, null), "#3");

    assets.TotalOpacity = 0.0018;
    assert.ok(!tapins.validate(assets, state, null, null, null), "#4");
});

QUnit.test("validateRegion", (assert) => {
    var assets = mock.assets();
    assets.SurfaceBoundsWithChildren = new Rect(50, 50, 100, 100);
    var state = mock.state();

    assert.ok(tapins.validateRegion(assets, state, null, null, new Rect(0, 0, 100, 200)), "#1");
    var rr = state.RenderRegion;
    assert.equal(rr.x, 50);
    assert.equal(rr.y, 50);
    assert.equal(rr.width, 50);
    assert.equal(rr.height, 100);


    assert.ok(!tapins.validateRegion(assets, state, null, null, new Rect(0, 0, 50, 150)), "#2");
    assert.equal(rr.x, 50);
    assert.equal(rr.y, 50);
    assert.equal(rr.width, 0);
    assert.equal(rr.height, 100);

    assert.ok(!tapins.validateRegion(assets, state, null, null, new Rect(100, 150, 25, 10)), "#3");
    assert.equal(rr.x, 100);
    assert.equal(rr.y, 150);
    assert.equal(rr.width, 25);
    assert.equal(rr.height, 0);
});

QUnit.test("prepareContext", (assert) => {
    var assets = mock.assets();
    var state = mock.state();

    var canvas = document.createElement('canvas');
    var rctx = new RenderContext(canvas.getContext('2d'));
    assert.equal(rctx.raw.globalAlpha, 1.0);

    rctx.scale(2, 4);
    mat3.createTranslate(10, 15, assets.RenderXform);
    assets.TotalOpacity = 0.5;
    tapins.prepareContext(assets, state, null, rctx, new Rect(), "#4");
    assert.equal(rctx.raw.globalAlpha, 0.5);
    assert.deepEqual(typedToArray(rctx.currentTransform), [2, 0, 20, 0, 4, 60, 0, 0, 1]);
    rctx.restore();
    assert.equal(rctx.raw.globalAlpha, 1.0);
    assert.deepEqual(typedToArray(rctx.currentTransform), [2, 0, 0, 0, 4, 0, 0, 0, 1]);
});

QUnit.test("applyClip", (assert) => {
    var assets = mock.assets();
    var state = mock.state();

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var rctx = new RenderContext(ctx);

    var clipDrawn = false;
    assets.Clip = <minerva.def.render.IGeometry>{
        Draw: function (ctx: RenderContext) {
            clipDrawn = true;
        }
    };

    var clipped = false;
    ctx.clip = function () {
        clipped = true;
    };

    assert.ok(tapins.applyClip(assets, state, null, rctx, new Rect(), "#1"));
    assert.ok(clipDrawn, "#2");
    assert.ok(clipped, "#3");
});

QUnit.test("preRender", (assert) => {
    var assets = mock.assets();
    var state = mock.state();

    var canvas = document.createElement('canvas');
    var rctx = new MockRenderContext(canvas.getContext('2d'));

    assets.Effect = <minerva.def.render.IEffect> {
        PreRender: function (ctx: RenderContext) {
            ctx.raw.globalAlpha = 0.5;
        },
        PostRender: function (ctx: RenderContext) {

        }
    };
    assert.ok(tapins.preRender(assets, state, null, rctx, new Rect(), "#1"));
    assert.ok(rctx.saved);
    assert.equal(rctx.raw.globalAlpha, 0.5);
    rctx.restore();
    assert.equal(rctx.raw.globalAlpha, 1.0);

    rctx.saved = false;
    assets.Effect = null;
    assert.ok(tapins.preRender(assets, state, null, rctx, new Rect(), "#2"));
    assert.ok(!rctx.saved);
});

QUnit.test("doRender", (assert) => {
    ok(true);
});

QUnit.test("postRender", (assert) => {
    var assets = mock.assets();
    var state = mock.state();

    var canvas = document.createElement('canvas');
    var rctx = new MockRenderContext(canvas.getContext('2d'));

    assets.Effect = <minerva.def.render.IEffect> {
        PreRender: function (ctx: RenderContext) {
        },
        PostRender: function (ctx: RenderContext) {
            ctx.raw.globalAlpha = 0.5;
        }
    };
    rctx.save();
    assert.ok(tapins.postRender(assets, state, null, rctx, new Rect(), "#1"));
    assert.ok(rctx.restored);
    assert.equal(rctx.raw.globalAlpha, 1.0);

    rctx.restored = false;
    assets.Effect = null;
    assert.ok(tapins.postRender(assets, state, null, rctx, new Rect(), "#2"));
    assert.ok(!rctx.restored);
});

QUnit.test("renderChildren", (assert) => {
    ok(true);
});

QUnit.test("restoreContext", (assert) => {
    var assets = mock.assets();
    var state = mock.state();

    var canvas = document.createElement('canvas');
    var rctx = new MockRenderContext(canvas.getContext('2d'));

    assert.ok(tapins.restoreContext(assets, state, null, rctx, new Rect(), "#1"));
    assert.ok(rctx.restored);
});