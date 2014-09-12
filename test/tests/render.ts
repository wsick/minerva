/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/minerva/minerva" />

QUnit.module("render");

import render = minerva.def.render;
import tapins = minerva.def.render.tapins;
import Rect = minerva.Rect;

function typedToArray(typed) {
    var arr = [];
    for (var i = 0; i < typed.length; i++) {
        arr.push(typed[i]);
    }
    return arr;
}

var mock = {
    assets: function():render.IAssets {
        return <render.IAssets> {
            TotalIsRenderVisible: true,
            TotalOpacity: 1.0,
            SurfaceBoundsWithChildren: new Rect(),
            RenderXform: mat3.identity(),
            Clip: null,
            Effect: null
        };
    },
    state: function(): render.IState {
        return <render.IState> {
            RenderRegion: new Rect()
        };
    }
};

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
    var ctx = canvas.getContext('2d');
    render.RenderContext.init(ctx);
    assert.equal(ctx.globalAlpha, 1.0);

    render.RenderContext.scale(ctx, 2, 4);
    mat3.createTranslate(10, 15, assets.RenderXform);
    assets.TotalOpacity = 0.5;
    tapins.prepareContext(assets, state, null, ctx, new Rect(), "#4");
    assert.equal(ctx.globalAlpha, 0.5);
    assert.deepEqual(typedToArray(ctx.currentTransform), [2, 0, 20, 0, 4, 60, 0, 0, 1]);
    render.RenderContext.restore(ctx);
    assert.equal(ctx.globalAlpha, 1.0);
    assert.deepEqual(typedToArray(ctx.currentTransform), [2, 0, 0, 0, 4, 0, 0, 0, 1]);
});