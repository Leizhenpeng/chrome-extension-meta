declare module "chrome-extension-meta" {
  interface ExtensionData {
    extensionId: string;
    iconUrl: string;
    url: string;
    name: string;
    description: string;
    installCount: number;
    rating: number;
    reviewCount: number;
    // Additional fields from detail.js
    detailedDescription?: string;
    additionalImages?: string[];
    version?: string;
    offeredBy?: string;
    updated?: string;
    size?: string;
    languages?: string;
    email?: string;
    websiteUrl?: string;
    privacyPolicyUrl?: string;
  }

  interface SearchResponse {
    success: boolean;
    error: string | null;
    number: number;
    data: ExtensionData[];
  }

  interface DetailResponse {
    success: boolean;
    error: string | null;
    details?: ExtensionData;
  }

  function quickSearch(keyword: string): Promise<SearchResponse>;
  function fullSearch(
    keyword: string,
    requestQuantity?: number
  ): Promise<SearchResponse>;
  function extMeta(extensionID: string | string[]): Promise<DetailResponse>;

  export default { quickSearch, fullSearch, extMeta };
}
