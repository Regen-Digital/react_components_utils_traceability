import { publicAPI } from '../utils/httpService';

export const encryptedService = async (filename: string, data: any) => {
  if (!filename || !data) throw new Error('Invalid params');
  if (!process.env.REACT_APP_PUBLIC_VC_BUCKET_NAME)
    throw new Error('Invalid bucket name');

  try {
    const response = await publicAPI.post(
      `${process.env.REACT_APP_STORAGE_API_URL}/v1/credentials`,
      {
        filename,
        bucket: process.env.REACT_APP_PUBLIC_VC_BUCKET_NAME,
        data,
      }
    );

    return response;
  } catch (error) {
    console.log({ error });
    throw new Error('Error calling encrypted service');
  }
};
