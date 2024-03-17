const assert = require('chai').assert;
const chromeStoreStats = require('../index.js');

describe("Chrome Store Stats Tests", function() {
	this.timeout(6000); // Set timeout for all tests in this describe block

	describe.only("Single ID Tests", function() {
		it("should handle existing extension ID:gkkmiofalnjagdcjheckamobghglpdpm", async function() {
			const data = await chromeStoreStats('gkkmiofalnjagdcjheckamobghglpdpm');
			console.log('data',data)
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);

			assert.equal(data.name, 'YouTube Windowed FullScreen');
		});

		it.only("should handle existing extension ID:gmimocjjppdelmhpcmpkhekmpoddgima", async function() {
			const data = await chromeStoreStats('gmimocjjppdelmhpcmpkhekmpoddgima');
			console.log('data',data)
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);
			assert.equal(data.name, 'Full Screen for Google Chrome');
		});


		it("should handle existing extension ID:olcfgpmjldkkjdclidhcbonieibfhhdh", async function() {
			const data = await chromeStoreStats('olcfgpmjldkkjdclidhcbonieibfhhdh');
			console.log('data',data)
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);
			assert.equal(data.name, 'Fullscreen Anything');
			assert.typeOf(data.languages, 'English');
		});
	});

	describe("Multiple IDs Tests", function() {
		it("should handle array of IDs", async function() {
			var data = await chromeStoreStats(['gkkmiofalnjagdcjheckamobghglpdpm', 'gkkmiofalnjagdcjheckamobghglpdpz', 'cfidkbgamfhdgmedldkagjopnbobdmdn']);

			
			assert.typeOf(data, 'object');
			assert.lengthOf(Object.keys(data), 3);

			const e1 = data['gkkmiofalnjagdcjheckamobghglpdpmw'];
			const e2 = data['gkkmiofalnjagdcjheckamobghglpdpz'];
			const e3 = data['cfidkbgamfhdgmedldkagjopnbobdmdn'];

			assert.equal(e1.success, true);
			assert.isNull(e1.error);
			assert.equal(e1.name, 'YouTube Windowed FullScreen');
			assert.typeOf(e1.installCount, 'number');
			assert.typeOf(e1.ratingCount, 'number');
			assert.typeOf(e1.ratingValue, 'number');

			assert.equal(e2.success, false);
			assert.equal(e2.error, 'Couldn\'t find extension with ID gkkmiofalnjagdcjheckamobghglpdpz');
			assert.equal(e2.name, '');
			assert.equal(e2.installCount, 0);
			assert.equal(e2.ratingCount, 0);
			assert.equal(e2.ratingValue, 0);

			assert.equal(e3.success, true);
			assert.isNull(e3.error);
			assert.equal(e3.name, 'Social Blade');
			assert.typeOf(e3.installCount, 'number');
			assert.typeOf(e3.ratingCount, 'number');
			assert.typeOf(e3.ratingValue, 'number');
		});
	});

	describe("Edge Cases", function() {
		it("should handle empty instantiation", async function() {
			const data = await chromeStoreStats();
			
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');
			assert.equal(data.name, '');
			assert.equal(data.installCount, 0);
			assert.equal(data.ratingCount, 0);
			assert.equal(data.ratingValue, 0);
		});

		it("should handle null instantiation", async function() {
			const data = await chromeStoreStats(null);
			
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');
			assert.equal(data.name, '');
			assert.equal(data.installCount, 0);
			assert.equal(data.ratingCount, 0);
			assert.equal(data.ratingValue, 0);
		});

		it("should handle undefined instantiation", async function() {
			const data = await chromeStoreStats(undefined);
			
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');
			assert.equal(data.name, '');
			assert.equal(data.installCount, 0);
			assert.equal(data.ratingCount, 0);
			assert.equal(data.ratingValue, 0);
		});

		it("should handle numeric extension ID", async function() {
			const data = await chromeStoreStats(3409);
			
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');
			assert.equal(data.name, '');
			assert.equal(data.installCount, 0);
			assert.equal(data.ratingCount, 0);
			assert.equal(data.ratingValue, 0);
		});

		it("should handle incorrect string instantiation", async function() {
			const data = await chromeStoreStats('3409');
			
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');
			assert.equal(data.name, '');
			assert.equal(data.installCount, 0);
			assert.equal(data.ratingCount, 0);
			assert.equal(data.ratingValue, 0);
		});
	});
});
