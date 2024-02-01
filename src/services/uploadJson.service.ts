import { publicAPI } from '../utils/httpService';

type Json = {
    [key: string]: any;
};

export enum BucketName {
    PublicVC = 'PublicVCBucket',
    PrivateVC = 'PrivateVCBucket',
    EPCISEvent = 'EPCISEventBucket',
}
/**
 * Uploads a json file to S3 storage.
 *
 * @param filename
 * @param json
 * @returns link to the uploaded json file
 *
 * @example
 * const json = {
 *  "name": "John",
 *  "age": 30,
 * }
 * const url = await uploadJson('test', json);
 * // Returns: https://storage.com/test.json
 */
export const uploadJson = async (filename: string, bucket: BucketName, json: Json): Promise<string> => {
    try {
        if (!process.env.REACT_APP_STORAGE_API_URL) throw new Error('REACT_APP_STORAGE_API_URL is not defined');

        const bucketNameMapping = {
            PublicVCBucket: process.env.REACT_APP_PUBLIC_VC_BUCKET_NAME!,
            PrivateVCBucket: process.env.REACT_APP_PRIVATE_VC_BUCKET_NAME!,
            EPCISEventBucket: process.env.REACT_APP_EPCIS_EVENT_BUCKET_NAME!,
        };

        if (!bucketNameMapping[bucket]) throw new Error('Invalid bucket name');

        const file = new File([JSON.stringify(json)], `${filename}`, {
            type: 'application/json',
        });

        const presignedUrlParams = {
            bucket: bucketNameMapping[bucket],
            key: file.name,
            fileType: file.type,
        };
        const { presignedUrl } = await publicAPI.post<{ presignedUrl: string }>(
            `${process.env.REACT_APP_STORAGE_API_URL}/presigned-url`,
            presignedUrlParams,
        );

        publicAPI.setContentTypeHeader(file.type);
        await publicAPI.put(presignedUrl, file);

        return `https://${bucketNameMapping[bucket]}.s3.ap-southeast-2.amazonaws.com/${file.name}`;
    } catch (error) {
        console.error(error);
        throw new Error('Error uploading json');
    }
};
