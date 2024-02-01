import { publicAPI } from '../../utils/httpService';
import { BucketName, uploadJson } from '../uploadJson.service';

describe('upload json service', () => {
    const env = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...env };
    });

    afterEach(() => {
        process.env = env;
    });

    it('should throw error when REACT_APP_STORAGE_API_URL is not defined', () => {
        delete process.env.REACT_APP_STORAGE_API_URL;
        expect(uploadJson('test', BucketName.PublicVC, {})).rejects.toThrow('Error uploading json');
    });

    it('should throw error when bucket name is invalid', () => {
        process.env.REACT_APP_STORAGE_API_URL = 'https://storage.com';
        expect(uploadJson('test', 'InvalidBucket' as BucketName, {})).rejects.toThrow('Error uploading json');
    });

    it('should return url when uploading json with valid VC', async () => {
        const credentialPayload = {
            context: ['https://dev-render-method-context.s3.ap-southeast-1.amazonaws.com/dlp.json'], // fake url
            type: ['BachelorDegree'],
            issuer: 'did:web:localhost',
            credentialSubject: {
                id: 'did:web:localhost',
                name: 'John Doe',
                age: 30,
            },
        };

        process.env.REACT_APP_STORAGE_API_URL = 'https://storage.com';
        process.env.REACT_APP_PUBLIC_VC_BUCKET_NAME = 'dev-bucket';

        publicAPI.post = jest.fn().mockResolvedValue({
            presignedUrl: 'https://dev-verifiable-credentials.com/NH020188LEJ00005/dlp-did-web.json',
        });

        publicAPI.put = jest.fn().mockResolvedValue({});
        const url = await uploadJson('test', BucketName.PublicVC, credentialPayload);
        expect(url).toEqual('https://dev-bucket.s3.ap-southeast-2.amazonaws.com/test');
    });

    it('should throw error when uploading json when put file to S3 failed', async () => {
        process.env.REACT_APP_STORAGE_API_URL = 'https://storage.com';
        process.env.REACT_APP_PUBLIC_VC_BUCKET_NAME = 'dev-bucket';

        publicAPI.post = jest.fn().mockResolvedValue({
            presignedUrl: 'https://dev-verifiable-credentials.com/NH020188LEJ00005/dlp-did-web.json',
        });

        publicAPI.put = jest.fn().mockRejectedValue(new Error('Error uploading json'));
        expect(uploadJson('test', BucketName.PublicVC, {})).rejects.toThrow('Error uploading json');
    });
});
