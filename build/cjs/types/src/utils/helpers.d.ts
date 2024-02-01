export declare function convertBase64ToString(base64: string): string;
export declare function detectDevice(userAgent: string): "mobile" | "laptop" | "unknown";
/**
 * @returns a random string of 5 characters
 */
export declare function randomString(): string;
export declare function generateUUID(): string;
export declare function splitStringByDash(string: string): string[];
export declare function extractStringFromURL(url: string): string;
export declare function getCurrentGMTDateTime(): string;
export declare const typeOf: (value: any) => string;
