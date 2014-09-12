/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/minerva/minerva" />

QUnit.module("render");

import render = minerva.def.render;
import tapins = minerva.def.render.tapins;
import Rect = minerva.Rect;

QUnit.test("validate", (assert) => {
    var assets: render.IAssets = {
        TotalIsRenderVisible: true,
        TotalOpacity: 1.0,
        SurfaceBoundsWithChildren: new Rect(),
        RenderXform: mat3.identity(),
        Clip: null,
        Effect: null
    };
    var state: render.IState = {
        RenderRegion: new Rect()
    };

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
    var assets: render.IAssets = {
        TotalIsRenderVisible: true,
        TotalOpacity: 1.0,
        SurfaceBoundsWithChildren: new Rect(50, 50, 100, 100),
        RenderXform: mat3.identity(),
        Clip: null,
        Effect: null
    };
    var state: render.IState = {
        RenderRegion: new Rect()
    };

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