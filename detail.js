const fetch = require('node-fetch');

const URL_PREFIX = 'https://chrome.google.com/webstore/detail/';
const REGEX_EXTENSION_ID = /[a-z]{32}$/;

// Extracted method to fetch and parse the extension page
async function fetchExtensionData(extensionID) {
    const response = await fetch(`${URL_PREFIX}${extensionID}`);
    return response.text();
}

// Helper method to extract data using regex
function extractData(regex, text) {
    const match = text.match(regex);
    return match ? match[1] : null;
}

function extractImageUrls(data, regex) {
    const matches = data.matchAll(regex);
    const urls = [];
    for (const match of matches) {
        if (match && match[1]) {
            urls.push(match[1]);
        }
    }
    return [...new Set(urls)]; // Remove duplicates
}

// Using object to map all regex patterns for easy reference
const regexPatterns = {
    canonicalLink: /<link rel="canonical" href="https:\/\/chromewebstore.google.com\/detail\/([^/]+)\/[a-z]{32}">/,
    userCount: /<\/a>([\d,]+) users<\/div>/,
    ratingCount: /([\d,]+) ratings<\/p><\/a>/,
    ratingValue: /span class="GlMWqe">([0-9.]+) out of 5/,
    title: /<title>(.*?)<\/title>/,
    description: /<meta property="og:description" content="([^"]+)"/,
    url: /<meta property="og:url" content="([^"]+)"/,
    detailedDescription: /<section class="H8vIqf"[^>]*>[\s\S]*?<div jsname="bN97Pc">[\s\S]*?<div[^>]*>([\s\S]*?)<\/div>/,
    introImages: /data-media-url="([^"]+)"/g,
    version: /Version<\/div>\s*<div[^>]*>([^<]+)<\/div>/,
    offeredBy: /Offered by<\/div>\s*<div[^>]*>([^<]+)<\/div>/,
    updated: /Updated<\/div>\s*<div[^>]*>([^<]+)<\/div>/,
    size: /Size<\/div>\s*<div[^>]*>([^<]+)<\/div>/,
    languages: /Languages<\/div>\s*<div[^>]*>\s*<div[^>]*>([^<]+)<\/div>/,
    // developer: /Developer<\/div>\s*<div[^>]*>\s*<div[^>]*>\s*<div[^>]*>([\s\S]+?)<\/div>/,
    logoUrl: /<img src="([^"]+)"[^>]*alt="Item logo image[^>]*>/,
    coverImage: /AF_initDataCallback\(\{.*?\["[^"]*","[^"]*","[^"]*",[^,]*,[^,]*,"([^"]*)"/,
    website: /Developer<\/div>[\s\S]*?<a[^>]+href="([^"]+)"[^>]*>.*?Website.*?<\/a>/,
    privacyPolicy: /<a[^>]+href="([^"]+)"[^>]*>privacy policy<\/a>/,
    email: /Developer<\/div>[\s\S]*?<div[^>]*?>([\w.-]+@[\w.-]+\.\w+)<\/div>/
};

async function extMeta(inputIDs) {
    const extensionIDs = [].concat(inputIDs);
    const responses = {};
    for (let extensionID of extensionIDs) {
        if (typeof extensionID !== "string" || !REGEX_EXTENSION_ID.test(extensionID.toLowerCase())) {
            responses[extensionID] = { success: false, error: 'Invalid extension ID.' };
            continue;
        }

        try {
            const data = await fetchExtensionData(extensionID);
            const basicInfo = {
                extensionId: extensionID,
                iconUrl: extractData(regexPatterns.logoUrl, data),
                url: extractData(regexPatterns.url, data),
                name: extractData(regexPatterns.title, data),
                description: extractData(regexPatterns.description, data),
                installCount: parseInt(extractData(regexPatterns.userCount, data)?.replace(/,/g, '') || '0', 10),
                rating: parseInt(extractData(regexPatterns.ratingCount, data)?.replace(/,/g, '') || '0', 10),
                reviewCount: parseFloat(extractData(regexPatterns.ratingValue, data) || '0'),
            };
            if (!basicInfo.url) {
                throw new Error('Extension not found');
            }
            const detailedInfo = {
                detailedDescription: extractData(regexPatterns.detailedDescription, data)?.replace(/<[^>]+>/g, '').trim(),
                additionalImages: extractImageUrls(data, regexPatterns.introImages),
                version: extractData(regexPatterns.version, data),
                offeredBy: extractData(regexPatterns.offeredBy, data),
                updated: extractData(regexPatterns.updated, data),
                size: extractData(regexPatterns.size, data),
                languages: extractData(regexPatterns.languages, data),
                // developer: extractData(regexPatterns.developer, data)?.trim().replace(/<[^>]+>/g, ''),
                email: extractData(regexPatterns.email, data)?.trim(),
                websiteUrl: extractData(regexPatterns.website, data)?.trim(),
                privacyPolicyUrl: extractData(regexPatterns.privacyPolicy, data),
            };


            responses[extensionID] = {
                success: true, error: null, ...basicInfo, details: detailedInfo
            };
        } catch (e) {
            responses[extensionID] = {
                success: false, error: `Couldn't find extension with ID ${extensionID}`,
            };
        }
    }

    return extensionIDs.length <= 1 ? responses[extensionIDs[0]] : responses;
}


module.exports = {
    extMeta
};