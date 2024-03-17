const assert = require('chai').assert;
const chromeStoreStats = require('../index.js');

describe("Chrome Web Store API Tests", function () {
	this.timeout(6000); // Set timeout for all tests in this describe block
	describe("Single ID Tests", function () {
		it.skip("should handle existing extension ID:gkkmiofalnjagdcjheckamobghglpdpm", async function () {
			const data = await chromeStoreStats('gkkmiofalnjagdcjheckamobghglpdpm');
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);
			assert.equal(data.name, 'YouTube Windowed FullScreen');
			assert.equal(data.details.languages, 'English');
			assert.equal(data.details.email, 'navi.jador@gmail.com');
			// console.log(data);
		});

		it.skip("should handle existing extension ID:hlepfoohegkhhmjieoechaddaejaokhf", async function () {
			const data = await chromeStoreStats('hlepfoohegkhhmjieoechaddaejaokhf');
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);
			assert.equal(data.name, 'Refined GitHub');
			assert.equal(data.details.languages, 'English');
			assert.equal(data.details.email, 'sindresorhus@gmail.com');
			// console.log(data);
		});

		it("should handle existing extension ID:hlepfoohegkhhmjieoechaddaejaokhf", async function () {
			const data = await chromeStoreStats('bkhaagjahfmjljalopjnoealnfndnagc');
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);
			assert.equal(data.details.languages, 'English (United States)');
			assert.equal(data.details.email, 'support@octotree.io');
			assert.equal(data.details.websiteUrl, 'https://octotree.io');
			// console.log(data);
		});

		it.skip("should handle existing extension ID:gmimocjjppdelmhpcmpkhekmpoddgima", async function () {
			const data = await chromeStoreStats('gmimocjjppdelmhpcmpkhekmpoddgima');
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);
			assert.equal(data.name, 'Full Screen for Google Chrome');
			// assert.equal(data.details.languages, '55 languages');
		});


		it("should handle existing extension ID:cdnlfphfngnfhjcnoikfhaomaaflaiie", async function () {
			const data = await chromeStoreStats('cdnlfphfngnfhjcnoikfhaomaaflaiie');
			assert.typeOf(data, 'object');
			assert.equal(data.success, true);
			assert.isNull(data.error);
			assert.equal(data.name, 'Video Maximizer');
			assert.equal(data.details.languages, 'English');
			assert.equal(data.details.email, 'trophygeek@trophygeek.com');
		});
	});

	describe("Multiple IDs Tests", function () {
		this.timeout(6000); // Set timeout for all tests in this describe block
		it("should handle array of IDs", async function () {
			var data = await chromeStoreStats(['gkkmiofalnjagdcjheckamobghglpdpm', 'gkkmiofalnjagdcjheckamobghglpdpz']);
			assert.typeOf(data, 'object');
			assert.lengthOf(Object.keys(data), 2);

			// console.log(data);

			const e1 = data['gkkmiofalnjagdcjheckamobghglpdpm'];
			const e2 = data['gkkmiofalnjagdcjheckamobghglpdpz'];

			assert.equal(e1.success, true);
			assert.isNull(e1.error);
			assert.equal(e1.name, 'YouTube Windowed FullScreen');
			assert.typeOf(e1.installCount, 'number');
			assert.typeOf(e1.reviewCount, 'number');
			assert.typeOf(e1.rating, 'number');

			assert.equal(e2.success, false);
			assert.equal(e2.error, 'Couldn\'t find extension with ID gkkmiofalnjagdcjheckamobghglpdpz');
		});
	});

	describe("Edge Cases", function () {
		it("should handle empty instantiation", async function () {
			const data = await chromeStoreStats();

			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');
		});

		it("should handle null instantiation", async function () {
			const data = await chromeStoreStats(null);
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');
		});

		it("should handle undefined instantiation", async function () {
			const data = await chromeStoreStats(undefined);
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');

		});

		it("should handle numeric extension ID", async function () {
			const data = await chromeStoreStats(3409);
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');

		});

		it("should handle incorrect string instantiation", async function () {
			const data = await chromeStoreStats('3409');
			assert.typeOf(data, 'object');
			assert.equal(data.success, false);
			assert.equal(data.error, 'Invalid extension ID.');

		});
	});
});
