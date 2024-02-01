import { contextDefault, typeDefault } from '../../models/vckit';
import { publicAPI } from '../../utils/httpService';
import { integrateVckitIssueVC } from '../vckit.service';

jest.mock('../../utils/httpService');

describe('vckit service', () => {
    it('should return a validate value when calling with full validate params', async () => {
        const credentialPayload = {
            context: ['https://dev-render-method-context.s3.ap-southeast-1.amazonaws.com/dlp.json'], // fake url
            type: ['BachelorDegree'],
            issuer: 'did:web:api.vckit.showthething.com',
            credentialSubject: {
                id: 'did:web:api.vckit.showthething.com',
                name: 'John Doe',
                age: 30,
            },
            restOfVC: {},
        };

        const expectValue = {
            credential: {
                '@context': [...contextDefault, ...credentialPayload.context],
                type: [...typeDefault, ...credentialPayload.type],
                issuer: {
                    id: credentialPayload.issuer,
                },
                credentialSubject: credentialPayload.credentialSubject,
                ...credentialPayload.restOfVC,
            },
        };

        publicAPI.post = jest.fn().mockResolvedValue(expectValue);

        const issueCredential = await integrateVckitIssueVC(credentialPayload);
        expect(issueCredential).toEqual(expectValue);
    });

    it('should return a validate value when calling with issuer and credentialSubject params', async () => {
        const credentialPayload = {
            issuer: 'did:web:api.vckit.showthething.com',
            credentialSubject: {
                id: 'did:web:api.vckit.showthething.com',
                name: 'John Doe',
                age: 30,
            },
        };

        const expectValue = {
            credential: {
                '@context': [...contextDefault],
                type: [...typeDefault],
                issuer: {
                    id: credentialPayload.issuer,
                },
                credentialSubject: credentialPayload.credentialSubject,
            },
        };

        publicAPI.post = jest.fn().mockResolvedValue(expectValue);

        const issueCredential = await integrateVckitIssueVC(credentialPayload);
        expect(issueCredential).toEqual(expectValue);
    });

    it('should return error when issuer empty', async () => {
        const feedResponsePromise = Promise.resolve(
            new Error('Error: invalid_argument: credential.issuer must not be empty'),
        );
        publicAPI.post = jest.fn().mockRejectedValueOnce(feedResponsePromise);

        try {
            await integrateVckitIssueVC({ issuer: '' });

            // If the above expression doesn't throw anything, this will fail the test.
            fail('Expected an error to be thrown');
        } catch (error) {
            expect(error).not.toBeNull();
        }
    });
});
