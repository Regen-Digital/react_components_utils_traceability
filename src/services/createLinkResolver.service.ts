import {
  LinkResolver,
  LinkResponse,
  GS1LinkResolver,
  GS1LinkResponse,
} from '../models/gs1';
import { privateAPI } from '../utils/httpService';

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
export const createLinkResolver = async (
  LinkResolver: LinkResolver,
  LinkResponses: LinkResponse[],
  qualifierPath: string = '/'
): Promise<string> => {
  const params: GS1LinkResolver[] = [
    constructLinkResolver(LinkResolver, LinkResponses, qualifierPath),
  ];
  try {
    privateAPI.setBearerTokenAuthorizationHeaders(
      process.env.REACT_APP_DLR_API_KEY || ''
    );
    await privateAPI.post<unknown>(
      `${process.env.REACT_APP_DLR_API_URL}/resolver`,
      params
    );
    return `${process.env.REACT_APP_DLR_API_URL}/${LinkResolver.identificationKeyType}/${LinkResolver.identificationKey}?linkType=all`;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating link resolver');
  }
};

const constructLinkResolver = (
  LinkResolver: LinkResolver,
  LinkResponses: LinkResponse[],
  qualifierPath: string = '/'
): GS1LinkResolver => {
  const gs1LinkResolver: GS1LinkResolver = {
    identificationKeyType: LinkResolver.identificationKeyType,
    identificationKey: LinkResolver.identificationKey,
    itemDescription: LinkResolver.itemDescription,
    qualifierPath: qualifierPath,
    active: true,
    responses: [],
  };

  LinkResponses.forEach((LinkResponse: LinkResponse) => {
    const gs1LinkResponseForUS: GS1LinkResponse = {
      ianaLanguage: 'en',
      context: 'us',
      defaultLinkType: false,
      defaultIanaLanguage: false,
      defaultContext: false,
      defaultMimeType: false,
      fwqs: false,
      active: true,
      ...LinkResponse,
    };

    const gs1LinkResponseForAU: GS1LinkResponse = {
      ianaLanguage: 'en',
      context: 'au',
      defaultLinkType: false,
      defaultIanaLanguage: false,
      defaultContext: false,
      defaultMimeType: false,
      fwqs: false,
      active: true,
      ...LinkResponse,
    };

    gs1LinkResolver.responses.push(gs1LinkResponseForUS, gs1LinkResponseForAU);
  });

  return gs1LinkResolver;
};
