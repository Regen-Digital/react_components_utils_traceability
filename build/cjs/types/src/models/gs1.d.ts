export interface GS1Link {
    href: string;
    title: string;
    context?: string;
    type: string;
    hreflang?: string[];
}
export interface GS1LinkSetBase {
    anchor: string;
    itemDescription: string;
    unixtime: number;
}
export interface DLRResponse {
    linkset: GS1LinkSet[];
}
export declare enum GS1LinkType {
    'certificationInfo' = "https://gs1.org/voc/certificationInfo",
    'verificationService' = "https://gs1.org/voc/verificationService",
    'serviceInfo' = "https://gs1.org/voc/serviceInfo"
}
export type GS1LinkSet = GS1LinkSetBase & {
    [key in GS1LinkType]?: GS1Link[];
};
export declare const defaultVerificationServiceLink: GS1Link;
export declare enum IdentificationKeyType {
    gtin = "gtin",
    nlisid = "nlisid",
    consignment_id = "consignment_id"
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
export declare enum LinkType {
    verificationLinkType = "gs1:verificationService",
    certificationLinkType = "gs1:certificationInfo",
    epcisLinkType = "gs1:epcis"
}
export declare enum MimeType {
    textPlain = "text/plain",
    textHtml = "text/html",
    applicationJson = "application/json"
}
