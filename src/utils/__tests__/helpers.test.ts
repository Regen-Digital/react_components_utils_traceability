import { convertBase64ToString, detectDevice, generateUUID, randomString, splitStringByDash } from '../helpers';

describe('convertBase64ToString', () => {
    it('should convert a base64 string to UTF-8 string', () => {
        const base64String = 'SGVsbG8gV29ybGQ='; // Base64 encoding of "Hello World"
        const result = convertBase64ToString(base64String);
        expect(result).toBe('Hello World');
    });

    it('should handle an empty base64 string', () => {
        const emptyBase64String = '';
        const result = convertBase64ToString(emptyBase64String);
        expect(result).toBe('');
    });
});

describe('detectDevice function', () => {
    it('should detect mobile devices', () => {
        const mobileUserAgents = [
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Android 10; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0',
        ];

        mobileUserAgents.forEach((userAgent) => {
            expect(detectDevice(userAgent)).toBe('mobile');
        });
    });

    it('should detect laptop devices', () => {
        const laptopUserAgents = [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
        ];

        laptopUserAgents.forEach((userAgent) => {
            expect(detectDevice(userAgent)).toBe('laptop');
        });
    });

    it('should detect unknown devices', () => {
        const unknownUserAgents = ['Mozilla/5.0'];

        unknownUserAgents.forEach((userAgent) => {
            expect(detectDevice(userAgent)).toBe('unknown');
        });
    });
});

describe('randomString', () => {
    it('should return a string with length 5', () => {
        const result = randomString();
        expect(result).toHaveLength(5);
    });

    it('should return a different string each time it is called', () => {
        const result1 = randomString();
        const result2 = randomString();
        expect(result1).not.toBe(result2);
    });
});

describe('generateUUID', () => {
    it('should return a string with length 36', () => {
        const result = generateUUID();
        expect(result).toHaveLength(36);
    });

    it('should return a different string each time it is called', () => {
        const result1 = generateUUID();
        const result2 = generateUUID();
        expect(result1).not.toBe(result2);
    });
});

describe('splitStringByDash', () => {
    it('should split a string by dash', () => {
        const result = splitStringByDash('foo-bar-baz');
        expect(result).toEqual(['foo', 'bar', 'baz']);
    });

    it('should return an array with one element if the string does not contain a dash', () => {
        const result = splitStringByDash('foobar');
        expect(result).toEqual(['foobar']);
    });
});
