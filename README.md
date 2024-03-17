
# **chrome-web-store-api**

## Introduction

`chrome-web-store-api` is a Node.js library designed to fetch essential details about extensions available on the Chrome Web Store. It offers programmatic access to various extension details such as name, approximate install count, user ratings, and more.

## Key Features

- **Efficient Retrieval:** Retrieve extension details using a single ID or an array of IDs with ease.
- **JSON-Formatted Response:** The API returns information in a well-structured JSON format for easy data processing.
- **Asynchronous Support:** Supports asynchronous operations using `async/await` for a smooth development flow.

## Installation

To integrate `chrome-web-store-api` into your project, run the following command in your terminal:

```bash
npm install chrome-web-store-api
```

## Usage

1. **Import the Module:**
   Initialize the library in your JavaScript file.

   ```javascript
   const chromeStoreApi = require('chrome-web-store-api');
   ```

2. **Fetching Details:**
   Retrieve information for a single extension by its ID.

   ```javascript
   async function getExtensionDetails(extensionID) {
       try {
           const data = await chromeStoreApi(extensionID);
           if (data.success) {
               console.log(data); // Log the extension details
           } else {
               console.error(data.error); // Handle errors
           }
       } catch (error) {
           console.error(error); // Handle exceptions
       }
   }

   // Example usage:
   getExtensionDetails('gkkmiofalnjagdcjheckamobghglpdpm');
   ```

3. **Fetching for Multiple IDs:**
   Retrieve details for multiple extensions by passing an array of IDs.

   ```javascript
   async function getMultipleExtensionsDetails(extensionIDs) {
       try {
           const data = await chromeStoreApi(extensionIDs);
           console.log(data); // Log details for each extension ID
       } catch (error) {
           console.error(error); // Handle exceptions
       }
   }

   // Example usage:
   getMultipleExtensionsDetails(['gkkmiofalnjagdcjheckamobghglpdpm', 'cfidkbgamfhdgmedldkagjopnbobdmdn']);
   ```

## Returned Data Structure

### Single Extension ID

```json
{
  "success": true,
  "error": false,
  "name": "YouTube Picture-in-Picture",
  "installCount": "12,651+",
  "ratingCount": 158,
  "ratingValue": 4.55
}
```

### Multiple Extension IDs

An object is returned with each key as an extension ID, and the value is the respective data structure.

### Field Descriptions

| Field             | Description                            |
|------------------|----------------------------------------|
| `success`        | Indicates successful retrieval.          |
| `error`          | Provides error information if applicable. |
| `name`           | The name of the extension.               |
| `installCount`    | Approximate install count as a string.    |
| `ratingCount`     | The number of user ratings.              |
| `ratingValue`     | The average user rating.                 |

### Additional Fields

- `description`: A brief description of the extension.
- `iconUrl`: The URL to the extension's icon.
- `coverUrl`: The URL to the extension's cover image.
- `detailUrl`: The URL to the extension's detail page.
- `detailedDescription`: A more comprehensive description of the extension.
- `additionalImages`: An array of URLs to additional images associated with the extension.
- `version`: The current version of the extension.
- `offeredBy`: The provider of the extension.
- `updated`: The last update timestamp.
- `size`: The size of the extension.
- `languages`: Languages supported by the extension.
- `developer`: The name of the developer.
- `email`: The developer's contact email.
- `websiteUrl`: The developer's website.
- `privacyPolicyUrl`: The URL to the developer's privacy policy.

## Notes

- The `installCount` field provides an approximation and may not reflect the exact number of installations.
- Due to potential changes in the Chrome Web Store's HTML structure, regular expression patterns may need to be updated to ensure accurate data extraction.

## Recommendations

- For production environments, consider implementing caching to enhance performance and minimize API calls.

## Caveats

- **Install Count Accuracy:** Following updates to the Google Web Store, the exact install count is no longer available. The API provides an approximate string value (e.g., "41,678+").
- **Data Extraction:** The library uses regular expressions for data extraction, which may require updates if the Chrome Web Store's HTML structure changes.

## Author

River Laolei (laolei@forkway.cn)

## GitHub Repository

For more information and to contribute, visit the GitHub repository: [leizhenpeng/chrome-web-store-api](https://github.com/leizhenpeng/chrome-web-store-api)
