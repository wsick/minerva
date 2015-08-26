module minerva.engine.tests {
	import Surface = minerva.engine.Surface;
	import Updater = minerva.core.Updater;
	
	QUnit.module("engine.Surface");
	
	QUnit.test("preRender hooks", (assert) => {
		var surface = new Surface();
		var hitcount = 0;
		var updater = new Updater();
		updater.preRender = () => hitcount++;
		
		surface.attachLayer(updater);
		surface.render();
		assert.strictEqual(hitcount, 0);
		surface.detachLayer(updater);
		
		updater.onSurfaceChanged = (oldSurface, newSurface) => {
			oldSurface && oldSurface.unhookPrerender(updater);
			newSurface && newSurface.hookPrerender(updater);
		};
		surface.attachLayer(updater);
		surface.render();
		assert.strictEqual(hitcount, 1);
		surface.render();
		assert.strictEqual(hitcount, 2);
		surface.detachLayer(updater);
		surface.render();
		assert.strictEqual(hitcount, 2);
	});
}