[![npm](https://img.shields.io/npm/v/chrome-webstore-stats)](https://www.npmjs.com/package/chrome-webstore-stats)
[![Build Status](https://travis-ci.org/navi1995/Chrome-Webstore-Stats.svg?branch=master)](https://travis-ci.org/navi1995/Chrome-Webstore-Stats)
[![David](https://img.shields.io/david/navi1995/chrome-webstore-stats)](https://david-dm.org/navi1995/chrome-webstore-stats)
[![Coverage Status](https://coveralls.io/repos/github/navi1995/Chrome-Webstore-Stats/badge.svg?branch=master)](https://coveralls.io/github/navi1995/Chrome-Webstore-Stats?branch=master)
# Chrome Webstore Stats 
This is a simple node module used to provide details of any given chrome webstore's extension ID (32 alpha string from end of webstore link) or ARRAY of extension IDs.

The following details will be provided given a valid webstore ID:
- Name: Name associated with extension ID for webstore listing.
- Install Count: Number of installs the webstore listing has 
- Rating Count: Number of votes cast
- Rating value: Average rating out of 5

## Note
Google Webstore has been updated and no longer provides specific install count, and instead aggregates e.g 41,678 -> 40,000+ so this will now be returned as a string.

## Setup
Run `npm install chrome-webstore-stats` to install the dependencies and module to your project.

## Usage & Example
Two primary methods of using the function will be either passing in a single string as the extension ID, in which case a single object with all relevant data will be returned... 

OR passing in an array of extension ID's, in which case an object will be returned. Please see below for data/object structure.

Using async/awaits:
```javascript
const chromeStoreStats = require('chrome-webstore-stats');
var data = await chromeStoreStats('gkkmiofalnjagdcjheckamobghglpdpm');

if (data.error) {
	console.log(data);
}

console.log(data);
// {
// 	success: true,
// 	error: false,
// 	name: 'YouTube Windowed FullScreen',
// 	installCount: 12651,
// 	ratingCount: 158,
// 	ratingValue: 4.550632911392405
// }
```

Using promises:
```javascript
const chromeStoreStats = require('chrome-webstore-stats');

chromeStoreStats('gkkmiofalnjagdcjheckamobghglpdpm').then(function(data) {
	if (data.error) {
		console.log(data);
	}

	console.log(data);
	// {
	// 	success: true,
	// 	error: false,
	// 	name: 'YouTube Windowed FullScreen',
	// 	installCount: 12651,
	// 	ratingCount: 158,
	// 	ratingValue: 4.550632911392405
	// }
});

```

Array of extension ID's example:
```javascript
const chromeStoreStats = require('chrome-webstore-stats');
var data = await awaitchromeStoreStats(['gkkmiofalnjagdcjheckamobghglpdpm', 'gkkmiofalnjagdcjheckamobghglpdpz', 'cfidkbgamfhdgmedldkagjopnbobdmdn']);

console.log(data);
// {
//   gkkmiofalnjagdcjheckamobghglpdpm: {
//     success: true,
//     error: false,
//     name: 'YouTube Windowed FullScreen',
//     installCount: 12651,
//     ratingCount: 158,
//     ratingValue: 4.550632911392405
//   },
//   gkkmiofalnjagdcjheckamobghglpdpz: {
//     success: false,
//     error: "Couldn't find extension with ID gkkmiofalnjagdcjheckamobghglpdpz",
//     name: '',
//     installCount: 0,
//     ratingCount: 0,
//     ratingValue: 0
//   },
//   cfidkbgamfhdgmedldkagjopnbobdmdn: {
//     success: true,
//     error: false,
//     name: 'Social Blade',
//     installCount: 362735,
//     ratingCount: 837,
//     ratingValue: 4.117084826762246
//   }
// }
```

Data will be returned in the following JSON format. These are returned in JSON format as follows:
```
{
	success: true/false,
	error: false/"string explaining what went wrong",
	name: "Name of the extension/webstore listing"
	installCount: "Number of installs",
	ratingCount: "Number of votes",
	ratingValue: "Average star rating out of 5"
}
```

Above data format will be provided inside an object, where key is the extension ID and value is the JSON when an array of extension ID's is provided to the function.

## Approach

All code is hosted in index.js as it's a quite straight forward function. 

Provided with an extension ID (32 long alpha string from end of the webstore link), the end point will extract using regex the relevant data fields and return them in JSON format. If any error occurs, error will be populated in the response. 

Given an array, the same data will be returned to user however as an Object where the extension ID will be the key, and the value will be the requested data.

To use as an endpoint, have a look at this endpoint example at https://github.com/navi1995/Chrome-Webstore-Stats-API

```javascript
function getChromeStoreDetails() {
	$.ajax({
		url: '/webstore-stats?id={extensionID}',
		method: 'GET',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json'
	}).done(function (data, textStatus, jqXHR) {
		if (data.installCount) $("#installCount").html(data.installCount);
		if (data.ratingValue) $("#ratingValue").html(Math.round((data.ratingValue + Number.EPSILON) * 100) / 100);
		if (data.ratingCount) $("#ratingCount").html(data.ratingCount); 
	});
}
```
