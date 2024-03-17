// Type declarations for node-fetch
import fetch from 'node-fetch';

declare const URL_PREFIX: string;
declare const REGEX_EXTENSION_ID: RegExp;

interface BasicInfo {
    extensionId: string;
    iconUrl: string | null;
    url: string | null;
    name: string | null;
    description: string | null;
    installCount: number;
    rating: number;
    reviewCount: number;
}

interface DetailedInfo {
    detailedDescription: string | null;
    additionalImages: string[];
    version: string | null;
    offeredBy: string | null;
    updated: string | null;
    size: string | null;
    languages: string | null;
    email: string | null;
    websiteUrl: string | null;
    privacyPolicyUrl: string | null;
}

interface ExtensionResponse {
    success: boolean;
    error: string | null;
    details?: DetailedInfo;
}

// ExtensionData could be either a single ExtensionResponse or a record of string keys to ExtensionResponse
type ExtensionData = ExtensionResponse | Record<string, ExtensionResponse>;

async function fetchExtensionData(extensionID: string): Promise<string>;

function extractData(regex: RegExp, text: string): string | null;

function extractImageUrls(data: string, regex: RegExp): string[];

declare const regexPatterns: {
    [key: string]: RegExp;
};

function extractExtensionData(extensionID: string): Promise<ExtensionResponse>;

export function fetchAndProcessExtensions(inputIDs: string | string[]): Promise<ExtensionData>;
