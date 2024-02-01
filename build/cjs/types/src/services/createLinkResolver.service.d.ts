import { LinkResolver, LinkResponse } from '../models/gs1';
/**
 * Generates a link resolver URL based on the provided LinkResolver and LinkResponse objects.
 *
 * @param LinkResolver - An object containing information for link resolution.
 * @param LinkResponses - An array of objects representing link responses.
 *
 * @returns The link resolver URL.
 *
 * @example
 * const linkResolver: LinkResolver = {
 *   identificationKeyType: 'nlisid',
 *   identificationKey: '3ABCD123XBDC0447',
 *   itemDescription: 'Deforestation-free Braford beef cattle',
 * };
 *
 * const linkResponses: LinkResponse[] = [
 *   {
 *     linkType: 'gs1:verificationService',
 *     linkTitle: 'VCKit verify service1',
 *     targetUrl: 'https://verify.com/dev/verifyCredential',
 *     mimeType: 'text/plain',
 *   },
 *   {
 *     linkType: 'gs1:certificationInfo',
 *     linkTitle: 'Livestock passport',
 *     targetUrl: 'https://storage.com/dlp-vc-did-web.json',
 *     mimeType: 'application/json',
 *   },
 * ];
 *
 * const resolverUrl = await createLinkResolver(linkResolver, linkResponses);
 * // Returns: http://localhost/nlisid/3ABCD123XBDC0447?linkType=all
 */
export declare const createLinkResolver: (LinkResolver: LinkResolver, LinkResponses: LinkResponse[], qualifierPath?: string) => Promise<string>;
