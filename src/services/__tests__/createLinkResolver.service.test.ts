import {
  LinkResolver,
  LinkResponse,
  IdentificationKeyType,
} from '../../models/gs1';
import { privateAPI } from '../../utils/httpService';
import { createLinkResolver } from '../createLinkResolver.service';

describe('create link resolve service', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('should return url when creating link resolver', async () => {
    process.env.REACT_APP_DLR_API_URL = 'http://localhost';

    const linkResolver: LinkResolver = {
      identificationKey: 'NH020188LEJ00005',
      identificationKeyType: IdentificationKeyType.nlisid,
      itemDescription: 'Digital Livestock',
    };

    const linkResponses: LinkResponse[] = [
      {
        linkType: 'gs1:verificationService',
        linkTitle: 'VCKit verify service1',
        targetUrl: 'https://verify.com/dev/verifyCredential',
        mimeType: 'text/plain',
      },
      {
        linkType: 'gs1:certificationInfo',
        linkTitle: 'Livestock passport',
        targetUrl: 'https://storage.com/dlp-vc-did-web.json',
        mimeType: 'application/json',
      },
    ];

    privateAPI.post = jest.fn().mockResolvedValue({});
    const resolverUrl = await createLinkResolver(linkResolver, linkResponses);

    expect(resolverUrl).toEqual(
      'http://localhost/nlisid/NH020188LEJ00005?linkType=all'
    );
  });

  it('should throw error when creating link resolver', async () => {
    const linkResolver: LinkResolver = {
      identificationKey: 'NH020188LEJ00005',
      identificationKeyType: IdentificationKeyType.nlisid,
      itemDescription: 'Digital Livestock',
    };

    const linkResponses: LinkResponse[] = [
      {
        linkType: 'gs1:verificationService',
        linkTitle: 'VCKit verify service1',
        targetUrl: 'https://verify.com/dev/verifyCredential',
        mimeType: 'text/plain',
      },
      {
        linkType: 'gs1:certificationInfo',
        linkTitle: 'Livestock passport',
        targetUrl: 'https://storage.com/dlp-vc-did-web.json',
        mimeType: 'application/json',
      },
    ];

    const errorMessage = 'Error creating link resolver';
    try {
      privateAPI.post = jest
        .fn()
        .mockRejectedValueOnce(new Error(errorMessage));
      await createLinkResolver(linkResolver, linkResponses);
    } catch (error: any) {
      expect(error.message).toEqual(errorMessage);
    }
  });

  it('should throw error when Bearer token empty', async () => {
    delete process.env.REACT_APP_DLR_API_KEY;

    const linkResolver: LinkResolver = {
      identificationKey: 'NH020188LEJ00005',
      identificationKeyType: IdentificationKeyType.nlisid,
      itemDescription: 'Digital Livestock',
    };

    const linkResponses: LinkResponse[] = [
      {
        linkType: 'gs1:verificationService',
        linkTitle: 'VCKit verify service1',
        targetUrl: 'https://verify.com/dev/verifyCredential',
        mimeType: 'text/plain',
      },
      {
        linkType: 'gs1:certificationInfo',
        linkTitle: 'Livestock passport',
        targetUrl: 'https://storage.com/dlp-vc-did-web.json',
        mimeType: 'application/json',
      },
    ];

    const errorMessage = 'Error creating link resolver';
    try {
      privateAPI.post = jest
        .fn()
        .mockRejectedValueOnce(new Error(errorMessage));
      await createLinkResolver(linkResolver, linkResponses);
    } catch (error: any) {
      expect(error.message).toEqual(errorMessage);
    }
  });
});
