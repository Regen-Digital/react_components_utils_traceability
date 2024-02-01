import { publicAPI } from '../utils/httpService';

/**
 * Retrieves the JSON data for the link resolver from the API.
 * @param linkResolverId The ID of the link resolver to retrieve.
 * @returns A Promise that resolves to the JSON data for the link resolver.
 * @throws An error if the API request fails or returns invalid data.
 */
export const getLinkResolverJsonData = async (linkResolver: string) => {
    try {
        const result = await publicAPI.get(linkResolver);
        return result;
    } catch (error: any) {
        console.error(error);
        throw new Error('Error getting link resolver data');
    }
};
