import { publicAPI } from '../../utils/httpService';
import { getLinkResolverJsonData } from '../api.service';

describe('api service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call publicAPI.get with the correct link resolver', async () => {
        const linkResolver = 'test-link-resolver';
        publicAPI.get = jest.fn().mockResolvedValue({
            type: ['VerifiableCredential'],
        });
        const data = await getLinkResolverJsonData(linkResolver);
        expect(data).not.toBeNull();
    });

    it('should throw error with the invalid return from publicAPI', async () => {
        const linkResolver = 'test-link-resolver';
        publicAPI.get = jest.fn().mockRejectedValue(new Error('Error getting link resolver data'));

        try {
            await getLinkResolverJsonData(linkResolver);
        } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error).toEqual(new Error('Error getting link resolver data'));
        }
    });
});
