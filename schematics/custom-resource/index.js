// Wrapper to export the compiled factory in a way the Nest CLI reliably resolves
console.log('[schematics/custom-resource] wrapper loaded');
const compiled = require('../dist/custom-resource/index.js');

// Debug: if the compiled module has named exports, print them
try {
	if (compiled && typeof compiled === 'object') {
		console.log('[schematics/custom-resource] compiled exports:', Object.keys(compiled));
	}
} catch (e) {
	// ignore
}

// If the compiled module exported named exports, re-export them; otherwise
// export the default factory as named export `customController` so collection.json can reference it.
exports.customController = compiled.customController || compiled.default || compiled;
console.log('[schematics/custom-resource] exported customController');
