type Json = {
    [key: string]: any;
};
export declare enum BucketName {
    PublicVC = "PublicVCBucket",
    PrivateVC = "PrivateVCBucket",
    EPCISEvent = "EPCISEventBucket"
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
export declare const uploadJson: (filename: string, bucket: BucketName, json: Json) => Promise<string>;
export {};
