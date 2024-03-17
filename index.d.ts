// Declare module to augment the node-fetch types if necessary
declare module "node-fetch" {
  export default function fetch(url: string, init?: any): Promise<Response>;
}

declare module "chrome-extension-meta" {
  // Define the shape of your extension data
  interface ExtensionData {
    extensionId: string;
    iconUrl: string | null;
    url: string | null;
    name: string | null;
    description: string | null;
    installCount: number;
    rating: number;
    reviewCount: number;
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

  // Define the shape of the response object
  interface ExtensionResponse {
    success: boolean;
    error: string | null;
    details?: ExtensionData;
  }

  // Define the function signature
  function fetchExtensionData(extensionID: string): Promise<string>;
  function extractData(regex: RegExp, text: string): string | null;
  function extractImageUrls(data: string, regex: RegExp): string[];

  // Export the main function
  export default function (
    inputIDs: string | string[]
  ): Promise<ExtensionResponse | { [key: string]: ExtensionResponse }>;
}
