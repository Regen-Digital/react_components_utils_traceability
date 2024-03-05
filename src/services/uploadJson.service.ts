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
 * @param bucket
 * @param json
 * @returns link to the uploaded json file
 *
 * @example
 * const json = {
 *  "name": "John",
 *  "age": 30,
 * }
 * const url = await uploadJson('test', 'my-bucket', json);
 * // Returns: https://storage.com/test.json
 */

export const uploadJson = async (
  filename: string,
  bucket: string,
  json: Json
): Promise<string> => {
  try {
    const params = {
      bucket: bucket,
      filename: filename,
      data: json,
    };
    const { uri } = await publicAPI.post<{ uri: string }>(
      `${process.env.REACT_APP_STORAGE_API_URL}/v1/documents`,
      params
    );

    return uri;
  } catch (error) {
    console.error(error);
    throw new Error('Error uploading json');
  }
};
