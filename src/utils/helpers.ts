import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export function convertBase64ToString(base64: string) {
  return Buffer.from(base64, 'base64').toString('utf8');
}

export function detectDevice(userAgent: string) {
  const userAgentLowerCase = userAgent.toLowerCase();

  if (
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgentLowerCase
    )
  ) {
    return 'mobile';
  } else if (/mac|win/i.test(userAgentLowerCase)) {
    return 'laptop';
  } else {
    return 'unknown';
  }
}

/**
 * @returns a random string of 5 characters
 */
export function randomString() {
  return Math.random().toString(36).slice(2, 7);
}

export function generateUUID() {
  return uuidv4();
}

export function splitStringByDash(string: string) {
  return string.split('-');
}

export function extractStringFromURL(url: string) {
  const regex = /nlisid\/([A-Z0-9]{16})/;
  const match = url.match(regex);

  if (match) {
    return match[1];
  } else {
    return '';
  }
}

export function getCurrentGMTDateTime() {
  const now = moment.utc();

  return now.format('ddd, DD MMM YYYY HH:mm:ss [GMT]');
}

export const typeOf = (value: any) =>
  Object.prototype.toString.call(value).slice(8, -1);
