/**
 * Retrieves the JSON data for the link resolver from the API.
 * @param linkResolverId The ID of the link resolver to retrieve.
 * @returns A Promise that resolves to the JSON data for the link resolver.
 * @throws An error if the API request fails or returns invalid data.
 */
export declare const getLinkResolverJsonData: (linkResolver: string) => Promise<any>;
