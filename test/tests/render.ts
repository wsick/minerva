/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/minerva/minerva" />

QUnit.module("render");

import render = minerva.def.render;
import Rect = minerva.Rect;

QUnit.test("validate", function (assert) {
    var assets:render.IAssets = {
        TotalIsRenderVisible: true,
        TotalOpacity: 1.0,
        SurfaceBoundsWithChildren: new Rect(),
        RenderXform: mat3.identity(),
        Clip: null,
        Effect: null
    };
    var state:render.IState = {
        RenderRegion: new Rect()
    };

    assert.ok(render.tapins.validate(assets, state, null, null, null), "#1");

    assets.TotalIsRenderVisible = false;
    assert.ok(!render.tapins.validate(assets, state, null, null, null), "#2");

    assets.TotalIsRenderVisible = true;
    assets.TotalOpacity = 0.002;
    assert.ok(render.tapins.validate(assets, state, null, null, null), "#3");

    assets.TotalOpacity = 0.0018;
    assert.ok(!render.tapins.validate(assets, state, null, null, null), "#4");
});