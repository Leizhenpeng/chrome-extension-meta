const fetch = require('node-fetch');

function objectToUrlEncoded(obj) {
    return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
}

async function fetchData(baseUrl, queryParams, bodyObject, headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }) {
    const queryString = objectToUrlEncoded(queryParams);
    const url = `${baseUrl}?${queryString}`;
    const body = objectToUrlEncoded(bodyObject);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        try {
            return await response.text();
        } catch (jsonError) {
            return await response.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function removePrefix(rawData) {
    // 首先去除倒数三行
    const lines = rawData.split('\n');
    // 只保留第四行
    return lines[3]?.trim();
}

function extractDataBlocks(cleanData) {
    //    先把他json
    const json = JSON.parse(cleanData);
    // 获取第三个元素
    const data = json[0][2]
    // console.log('data', data)
    return data;
}

function parseQuickSearchFields(block) {
    const patterns = [
        { name: 'title', regex: /.+?/ },
        { name: 'id', regex: /^[a-z0-9]{32}$/ },
        { name: 'version', regex: /\d+(?:\.\d+)?/ },
        { name: 'iconURL', regex: /https?:\/\/[^\s"]+/ }
    ];

    const entries = block.replace(/null,?/g, '').replace(/\[\[/g, '[').replace(/\]\]/g, ']').split('],[');
    // console.log('entries',entries)
    const results = entries.map(entry => {
        const fields = entry
            .split(',')
            .map(field => field.replace(/^["[]+|["\]]+$/g, '').trim());

        let result = {};
        let lastIndex = -1;
        patterns.forEach(pattern => {
            for (let i = lastIndex + 1; i < fields.length; i++) {
                if (pattern.regex.test(fields[i])) {
                    result[pattern.name] = fields[i];
                    lastIndex = i;
                    break;
                }
            }
        });

        return result;
    });

    return results.filter(result => Object.keys(result).length > 0);
}


function parseStoreSearchFields(block) {
    const patterns = [
        { name: 'id', regex: /^[a-z0-9]{32}$/ },
        { name: 'iconURL', regex: /^https:\/\/lh3\.googleusercontent\.com\// },
        { name: 'title', regex: /.+/ }, // Assuming title can be any text
        { name: 'rating', regex: /^\d+(\.\d+)?$/ },
        { name: 'reviewCount', regex: /^\d+$/ },
        { name: 'coverURL', regex: /^https:\/\/lh3\.googleusercontent\.com\// },
        { name: 'description', regex: /.+/ } // Assuming description can be any text, maybe improved based on specific needs
    ];

    const entries = block.replace(/null,?/g, '').replace(/\[\[/g, '[').replace(/\]\]/g, ']').split('],[');

    const results = entries.map(entry => {

        const fields = entry.slice(2, -2)
            .split(',')
            .map(field => field.replace(/^["[]+|["\]]+$/g, '').trim());
        // 去除fields 的倒数3个元素
        fields.splice(-3, 3);
        let result = {};
        let lastIndex = -1;
        // console.log('fields', fields)
        patterns.forEach(pattern => {
            for (let i = lastIndex + 1; i < fields.length; i++) {
                if (pattern.regex.test(fields[i])) {
                    result[pattern.name] = fields[i];
                    lastIndex = i;
                    break;
                }
            }
        });

        return result;
    });
    // 过滤空值
    return results.filter(result => Object.keys(result).length > 0);
}




function parseDataUsingRegex(rawData) {
    const cleanData = removePrefix(rawData);
    const dataBlocks = extractDataBlocks(cleanData);
    // console.log('dataBlocks', dataBlocks)
    // console.log("----")
    const results = parseQuickSearchFields(dataBlocks);

    return results;
}


function parseStoreDataUsingRegex(rawData) {
    const cleanData = removePrefix(rawData);
    const dataBlocks = extractDataBlocks(cleanData);
    const results = parseStoreSearchFields(dataBlocks);
    return results;
}


async function quickSearch(keyword) {
    const baseUrl = 'https://chromewebstore.google.com/_/ChromeWebStoreConsumerFeUi/data/batchexecute';
    const queryParams = {
        'rpcids': 'QcU9bc',
        'source-path': '/',
        'bl': 'boq_chrome-webstore-consumerfe-ui_20240306.00_p1',
        'hl': 'en-GB',
        'soc-app': '1',
        'soc-platform': '1',
        'soc-device': '1',
        'rt': 'c'
    };
    const bodyObject = {
        'f.req': `[[["QcU9bc","[\\"${keyword}\\",null,null,2]"]]]`
    };

    try {
        const rawData = await fetchData(baseUrl, queryParams, bodyObject);
        const searchResults = parseDataUsingRegex(rawData);
        return {
            success: true,
            error: null,
            number: searchResults.length,
            data: searchResults
        };
    } catch (error) {
        console.error('Error in quickSearch:', error);
        return {
            success: false,
            error: `Error searching keyword ${keyword}: ${error.message}`,
            data: null
        };
    }
}

async function fullSearch(keyword, requestQuantity = 10) {
    const baseUrl = 'https://chromewebstore.google.com/_/ChromeWebStoreConsumerFeUi/data/batchexecute';
    const queryParams = {
        'rpcids': 'xY2Ddd',
        'source-path': '/search/%E8%B1%86%E7%93%A3',
        'bl': 'boq_chrome-webstore-consumerfe-ui_20240306.00_p1',
        'hl': 'en-GB',
        'soc-app': '1',
        'soc-platform': '1',
        'soc-device': '1',
        'rt': 'c'
    };
    const bodyObject = {
        'f.req': `[[["zTyKYc","[[null,[null,null,null,[\\"${keyword}\\",[${requestQuantity}],null,null,null,null,1]]]]",null,"1"]]]`
    };

    try {
        const rawData = await fetchData(baseUrl, queryParams, bodyObject);
        // console.log('rawData', rawData);
        const searchResults = parseStoreDataUsingRegex(rawData);
        return {
            success: true,
            error: null,
            number: searchResults.length,
            data: searchResults
        };
    } catch (error) {
        console.error('Error in fullSearch:', error);
        return {
            success: false,
            error: `Error searching keyword ${keyword}: ${error.message}`,
            data: null
        };
    }
}

// 使用函数
// fullSearch('抖音', 2).then(console.log);
module.exports = { quickSearch, fullSearch }




