# **chrome-extension-meta** 🌐
<samp>

[**简体中文**](./README_CN.md) · [**English**](./README.md)

</samp>
## 介绍 📜

`chrome-extension-meta` 是一个为 Node.js 设计的库，旨在获取 Chrome 网上应用店中可用扩展的基本详细信息。它提供了对各种扩展细节的程序化访问，如名称、大致安装次数、用户评分等。

## 主要特性 🗝️

- **获取扩展详情：** 通过其 ID 检索特定扩展的详细信息。
- **快速搜索（QuickSearch）和全面搜索（FullSearch）：** 快速使用部分数据查找扩展或执行详细结果的全面搜索。
- **高效检索：** 使用单个 ID、ID 数组或通过快速和全面搜索功能检索扩展详情。
- **JSON 格式响应：** API 以结构良好的 JSON 格式返回信息，便于数据处理。
- **异步支持：** 使用 `async/await` 支持异步操作，以实现流畅的开发流程。

## 安装 💿

要将 `chrome-extension-meta` 集成到您的项目中，请在终端中运行以下命令：

```bash
npm install chrome-extension-meta
```

## 使用 📊

### 导入模块

在您的 JavaScript 文件中初始化库。

```javascript
const chromeStoreApi = require('chrome-extension-meta');
```

### 获取详情

通过其 ID 检索单个扩展的信息。

```javascript
async function getExtensionDetails(extensionID) {
    try {
        const data = await chromeStoreApi.extMeta(extensionID);
        if (data.success) {
            console.log(data); // 记录扩展详情
        } else {
            console.error(data.error); // 处理错误
        }
    } catch (error) {
        console.error(error); // 处理异常
    }
}

// 示例使用：
getExtensionDetails('gkkmiofalnjagdcjheckamobghglpdpm');
```

### 多 ID 获取详情

通过传递 ID 数组来检索多个扩展的详情。

```javascript
async function getMultipleExtensionsDetails(extensionIDs) {
    try {
        const data = await chromeStoreApi.extMeta(extensionIDs);
        console.log(data); // 记录每个扩展 ID 的详情
    } catch (error) {
        console.error(error); // 处理异常
    }
}

// 示例使用：
getMultipleExtensionsDetails(['gkkmiofalnjagdcjheckamobghglpdpm', 'cfidkbgamfhdgmedldkagjopnbobdmdn']);
```

### 快速搜索

使用查询快速搜索扩展。

```javascript
async function quickSearch(query) {
    try {
        const results = await chromeStoreApi.quickSearch(query);
        console.log(results); // 记录搜索结果
    } catch (error) {
        console.error(error);
    }
}

// 示例使用：
quickSearch('youtube');

// 示例响应
```json
{
  "success": true,
  "error": null,
  "number": 10,
  "data": [
    {
      "name": "Adblock for Youtube™",
      "id": "cmedhionkhpnakcndndgjdbohmhepckk",
      "version": "1",
      "iconURL": "https://lh3.googleusercontent.com/bMu6IzWn8zG4yCpDcUrrTHA8bh5pVuAW706__3d2e6Lw_XwpqY3qxn_BfqUS3aaCTisvqFQIN1C9ac4Dm6s0Fz-vOg" 
    },
    // 其他结果...
  ]
}
```

### 全面搜索

执行全面搜索以获取有关扩展的详细信息。

```javascript
async function fullSearch(query, count) {
    try {
        const results = await chromeStoreApi.fullSearch(query, count);
        console.log(results); // 记录详细的搜索结果
    } catch (error) {
        console.error(error);
    }
}

// 示例使用：
fullSearch('tiktok', 10);

// 示例响应
```json
{
  "success": true,
  "error": null,
  "number": 11,
  "data": [
    {
      "id": "cdphkkecaejjijafinepmkefiegpkdjf",
      "iconURL": "https://lh3.googleusercontent.com/gM35fKqoEeCuNXTXDOin74oxaxSKbAb-y3klmr8MbO6UTq3I-OZI8NdMY5X7iD0YUpopE_TaI8GvZJoDHoe3KePS", 
      "title": "TikTok™ for Desktop",
      "rating": "3.0943396226415096",
      "reviewCount": "53",
      "coverURL": "https://lh3.googleusercontent.com/AwjI84r9DGHzqiITgMQw4eygbx-8cGjT5hMvD37sYZiLOoTTRQWw8kh5vNP7AqjO2jhjIYF_BrlaLp8Js79NUhDZ", 
      "description": "Experience TikTok™ for desktop like never before: a Chrome extension that brings exciting and creative content to your screen"
    },
    // 其他结果...
  ]
}
```

## 返回数据结构 📐

### 单个扩展 ID

```json
{
  "success": true,
  "error": false,
  "name": "YouTube Picture-in-Picture",
  "installCount": "12,651",
  "ratingCount": 158,
  "ratingValue": 4.55
}
```

### 多个扩展 ID

返回的对象中，每个键都是一个扩展 ID，值是相应的数据结构。

### 字段描述

| 字段                 | 描述                                                          |
| --------------------- | -------------------------------------------------------------------- |
| `success`             | 表示成功检索。                                              |
| `error`               | 如适用，提供错误信息。                                      |
| `name`                | 扩展的名称。                                                |
| `installCount`        | 作为字符串的大致安装次数。                                   |
| `ratingCount`         | 用户评分的数量。                                              |
| `ratingValue`         | 平均用户评分。                                               |
| `description`         | 扩展的简短描述。                                           |
| `iconUrl`             | 扩展图标的 URL。                                            |
| `coverUrl`            | 扩展封面图片的 URL。                                       |
| `detailUrl`           | 扩展详情页面的 URL。                                        |
| `detailedDescription` | 扩展的更详细描述。                                        |
| `additionalImages`    | 与扩展相关的附加图片的 URL 数组。                            |
| `version`             | 扩展的当前版本。                                            |
| `offeredBy`           | 扩展的提供者。                                              |
| `updated`             | 最后更新时间戳。                                              |
| `size`                | 扩展的大小。                                                 |
| `languages`           | 扩展支持的语言。                                            |
| `developer`           | 开发者的名称。                                              |
| `email`               | 开发者的联系电子邮件。                                       |
| `websiteUrl`          | 开发者的网站。                                              |
| `privacyPolicyUrl`    | 开发者隐私政策的 URL。                                   |

## 注意事项 📝

- `installCount` 字段提供近似值，可能不反映确切的安装次数。
- 由于 Chrome 网上应用店的 HTML 结构可能发生变化，正则表达式模式可能需要更新以确保准确的数据提取。

## 建议 🔍

- 对于生产环境，考虑实现缓存以提高性能并最小化 API 调用。

## 警告 ⚠️

- **安装次数准确性：** 跟随 Google 网上应用店的更新，确切的安装次数不再可用。API 提供一个近似的字符串值（例如，“41,678+”）。
- **数据提取：** 库使用正则表达式进行数据提取，如果 Chrome 网上应用店的 HTML 结构发生变化，可能需要更新。

## 作者 👤

River (laolei@forkway.cn)

## GitHub 仓库 📦

欲了解更多信息并参与贡献，请访问 GitHub 仓库：[leizhenpeng/chrome-extension-meta](https://github.com/leizhenpeng/chrome-extension-meta)

