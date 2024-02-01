// Interface to represent a GS1Link object
export interface GS1Link {
  href: string; // The URL of the link
  title: string; // The title or description of the link
  context?: string; // Optional context information
  type: string; // The type of link (e.g., 'application/json')
  hreflang?: string[]; // Optional array of hreflang values
}

// Interface to represent the base properties of a GS1LinkSet
export interface GS1LinkSetBase {
  anchor: string; // The anchor or identifier for the link set
  itemDescription: string; // The description of the linked item
  unixtime: number; // Unix timestamp
}

// Interface to represent the data response of DLR
export interface DLRResponse {
  linkset: GS1LinkSet[];
}

// Enum to define possible GS1LinkType values with corresponding URLs
export enum GS1LinkType {
  'certificationInfo' = 'https://gs1.org/voc/certificationInfo',
  'verificationService' = 'https://gs1.org/voc/verificationService',
  'serviceInfo' = 'https://gs1.org/voc/serviceInfo',
}

// Type to represent a GS1LinkSet, combining GS1LinkSetBase properties with
// dynamic keys for GS1LinkType values, allowing each type of link to have
// an associated array of GS1Link objects.
export type GS1LinkSet = GS1LinkSetBase & { [key in GS1LinkType]?: GS1Link[] };

export const defaultVerificationServiceLink: GS1Link = {
  href: process.env.REACT_APP_DEFAULT_VERIFICATION_SERVICE_URL || '',
  title: 'Default Verification Service',
  context: 'Default Verification Service',
  type: 'application/json',
  hreflang: ['en'],
};

export enum IdentificationKeyType {
  gtin = 'gtin',
  nlisid = 'nlisid',
  consignment_id = 'consignment_id',
}

export interface GS1LinkResolver {
  identificationKeyType: IdentificationKeyType;
  identificationKey: string;
  itemDescription: string;
  qualifierPath: string;
  active: boolean;
  responses: GS1LinkResponse[];
}

export interface GS1LinkResponse {
  linkType: string;
  ianaLanguage: string;
  context: string;
  mimeType: string;
  linkTitle: string;
  targetUrl: string;
  defaultLinkType: boolean;
  defaultIanaLanguage: boolean;
  defaultContext: boolean;
  defaultMimeType: boolean;
  fwqs: boolean;
  active: boolean;
}

export interface LinkResolver {
  identificationKeyType: IdentificationKeyType;
  identificationKey: string;
  itemDescription: string;
}

export interface LinkResponse {
  linkType: string;
  linkTitle: string;
  targetUrl: string;
  mimeType: string;
  defaultMimeType?: boolean;
  defaultLinkType?: boolean;
}

export enum LinkType {
  verificationLinkType = 'gs1:verificationService',
  certificationLinkType = 'gs1:certificationInfo',
  epcisLinkType = 'gs1:epcis',
}

export enum MimeType {
  textPlain = 'text/plain',
  textHtml = 'text/html',
  applicationJson = 'application/json',
}
