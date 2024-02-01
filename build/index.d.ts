import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default from 'react';
import { CredentialPayload, VerifiableCredential } from '@vckit/core-types';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { Html5QrcodeResult } from 'html5-qrcode';
import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

/**
 * Footer component is used to display the footer
 */
declare const Footer: () => react_jsx_runtime.JSX.Element;

interface IStyle {
    content?: React__default.CSSProperties;
    title?: React__default.CSSProperties;
    actions?: React__default.CSSProperties;
}
interface DialogProps {
    open: boolean;
    onClose: () => void;
    title?: React__default.ReactNode;
    content?: React__default.ReactNode;
    buttons?: React__default.ReactNode;
    style?: IStyle;
}
declare const _default$1: React__default.MemoExoticComponent<({ open, onClose, title, content, buttons, style, }: DialogProps) => react_jsx_runtime.JSX.Element>;

interface IHeader {
    routerLinks: {
        title: string;
        path: string;
    }[];
}
interface IHeader {
    routerLinks: {
        title: string;
        path: string;
    }[];
}
/**
 * Header component is used to display the header and navigation to other pages
 */
declare const Header: ({ routerLinks }: IHeader) => react_jsx_runtime.JSX.Element;

declare const enum ErrorText {
    required = "is a required property"
}
interface IDefaultValue {
    listNameFile?: string;
    title: string;
}
interface IssueFormValue {
    [key: string]: IDefaultValue;
}
type JsonFormData = {
    [key: string]: any;
};
declare const defaultIssueFormValue: IssueFormValue;
declare enum Status {
    success = "success",
    error = "error"
}
interface IScannerRef {
    closeQrCodeScanner: () => void;
}

interface IIssueFormWrapProps {
    formName: string;
    processor: (formData: JsonFormData, credentialPayload: CredentialPayload) => Promise<{
        vc: VerifiableCredential;
    }> | any;
    dynamicSchema?: any;
}
/**
 * IssueFormWrap component is used to display the json schema form with similar format.
 */
declare const IssueFormWrap: ({ dynamicSchema, formName, processor }: IIssueFormWrapProps) => react_jsx_runtime.JSX.Element;

interface IssuerFormClear {
    onClear: () => void;
}
interface IssuerForm {
    onChangeIssuerForm: (issue: string, error: string) => void;
    error: string;
}
/**
 * IssueDropbox component is used to display the issuer.
 */
declare const IssuerDropdown: React.ForwardRefExoticComponent<IssuerForm & React.RefAttributes<IssuerFormClear>>;

/**
 * IProps interface is used to define the props of LoadingWithText component
 */
interface IProps {
    text: string;
}
/**
 *
 * LoadingWithText component is used to display a loading spinner with text
 */
declare const LoadingWithText: ({ text }: IProps) => react_jsx_runtime.JSX.Element;

declare enum EPCISEventType {
    Transformation = "transformation",
    Object = "object",
    Aggregation = "aggregation",
    Transaction = "transaction",
    Association = "association"
}
declare enum EPCISEventAction {
    Observe = "observe"
}
declare enum EPCISEventDisposition {
    InTransit = "in_transit"
}
interface EPCISEvent {
    eventType: EPCISEventType;
    eventTime: string;
    actionCode: string;
    dispositionCode: string;
    readPointId: {
        id: string;
    } | string;
    locationId: {
        id: string;
    } | string;
    [key: string]: any;
}
interface EPCIS {
    '@context': string[];
    type: string;
    schemaVersion: string;
    creationDate: string;
    epcisBody: {
        eventList: EPCISEvent[];
    };
    [key: string]: any;
}
declare const MANDATORY_CONTEXTS: string[];

declare const contextDefault: string[];
declare const typeDefault: string[];

interface GS1Link {
    href: string;
    title: string;
    context?: string;
    type: string;
    hreflang?: string[];
}
interface GS1LinkSetBase {
    anchor: string;
    itemDescription: string;
    unixtime: number;
}
interface DLRResponse {
    linkset: GS1LinkSet[];
}
declare enum GS1LinkType {
    'certificationInfo' = "https://gs1.org/voc/certificationInfo",
    'verificationService' = "https://gs1.org/voc/verificationService",
    'serviceInfo' = "https://gs1.org/voc/serviceInfo"
}
type GS1LinkSet = GS1LinkSetBase & {
    [key in GS1LinkType]?: GS1Link[];
};
declare const defaultVerificationServiceLink: GS1Link;
declare enum IdentificationKeyType {
    gtin = "gtin",
    nlisid = "nlisid",
    consignment_id = "consignment_id"
}
interface GS1LinkResolver {
    identificationKeyType: IdentificationKeyType;
    identificationKey: string;
    itemDescription: string;
    qualifierPath: string;
    active: boolean;
    responses: GS1LinkResponse[];
}
interface GS1LinkResponse {
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
interface LinkResolver {
    identificationKeyType: IdentificationKeyType;
    identificationKey: string;
    itemDescription: string;
}
interface LinkResponse {
    linkType: string;
    linkTitle: string;
    targetUrl: string;
    mimeType: string;
    defaultMimeType?: boolean;
    defaultLinkType?: boolean;
}
declare enum LinkType {
    verificationLinkType = "gs1:verificationService",
    certificationLinkType = "gs1:certificationInfo",
    epcisLinkType = "gs1:epcis"
}
declare enum MimeType {
    textPlain = "text/plain",
    textHtml = "text/html",
    applicationJson = "application/json"
}

/**
 *
 * MessageText component is used to display a message and icon with status and text
 */
type PropsWithChildren = {
    status?: Status;
    text: string;
};
declare function MessageText({ status, text }: PropsWithChildren): react_jsx_runtime.JSX.Element;

interface IRenderJsonSchemaProps {
    schema: JsonSchema;
    uiSchema?: UISchemaElement;
    initialData?: any;
    onChangeJsonSchemaForm: ({ errors, data }: {
        errors: any[];
        data: any;
    }) => void;
}
/**
 * Renders a JSON schema using the JSON Forms library.
 */
declare const RenderJsonSchema: ({ schema, uiSchema, initialData, onChangeJsonSchemaForm }: IRenderJsonSchemaProps) => react_jsx_runtime.JSX.Element;

interface IHtml5QrcodePluginProps {
    fps?: number;
    qrbox?: {
        width: number;
        height: number;
    };
    aspectRatio?: number;
    disableFlip?: boolean;
    qrCodeSuccessCallback: (decodedText: string, result: Html5QrcodeResult) => void;
    qrCodeErrorCallback?: (error: unknown) => void;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<IHtml5QrcodePluginProps & React.RefAttributes<IScannerRef>>>;

/**
 * Generates a link resolver URL based on the provided LinkResolver and LinkResponse objects.
 *
 * @param LinkResolver - An object containing information for link resolution.
 * @param LinkResponses - An array of objects representing link responses.
 *
 * @returns The link resolver URL.
 *
 * @example
 * const linkResolver: LinkResolver = {
 *   identificationKeyType: 'nlisid',
 *   identificationKey: '3ABCD123XBDC0447',
 *   itemDescription: 'Deforestation-free Braford beef cattle',
 * };
 *
 * const linkResponses: LinkResponse[] = [
 *   {
 *     linkType: 'gs1:verificationService',
 *     linkTitle: 'VCKit verify service1',
 *     targetUrl: 'https://verify.com/dev/verifyCredential',
 *     mimeType: 'text/plain',
 *   },
 *   {
 *     linkType: 'gs1:certificationInfo',
 *     linkTitle: 'Livestock passport',
 *     targetUrl: 'https://storage.com/dlp-vc-did-web.json',
 *     mimeType: 'application/json',
 *   },
 * ];
 *
 * const resolverUrl = await createLinkResolver(linkResolver, linkResponses);
 * // Returns: http://localhost/nlisid/3ABCD123XBDC0447?linkType=all
 */
declare const createLinkResolver: (LinkResolver: LinkResolver, LinkResponses: LinkResponse[], qualifierPath?: string) => Promise<string>;

declare const encryptedService: (filename: string, data: any) => Promise<any>;

type Party = {
    partyID: string;
    name: string;
};
type Transaction = {
    type: string;
    identifier: string;
    documentURL: string;
};
type Item = {
    itemID: string;
    name: string;
};
type EPCISTransactionEventParams = {
    context: string[];
    sourceParty: Party;
    destinationParty: Party;
    transaction: Transaction;
    itemList: Item[];
    identificationKey: string;
    identificationKeyType: IdentificationKeyType;
    readPointId: string;
    locationId: string;
};
/**
 * Creates an EPCIS Transaction Event and uploads it to S3 storage, then links it to DLR.
 *
 * @param params - An object containing the parameters for creating the EPCIS Transaction Event.
 * @returns The URL for the created EPCIS Transaction Event.
 *
 * @example
 * const params = {
 *   context: ['https://gs1.org/vc'],
 *   sourceParty: {
 *     partyID: 'urn:uuid:12345678-1234-5678-1234-567812345678',
 *     name: 'John Doe',
 *   },
 *   destinationParty: {
 *     partyID: 'urn:uuid:12345678-1234-5678-1234-567812345678',
 *     name: 'John Doe',
 *   },
 *   transaction: {
 *     type: 'inv',
 *     identifier: 'urn:epc:id:sgtin:0614141.107346.115',
 *     documentURL: 'https://storage.com/transaction.json',
 *   },
 *   itemList: [
 *     {
 *       itemID: 'urn:epc:id:sgtin:0614141.107346.115',
 *       name: 'Deforestation-free Braford beef cattle',
 *     },
 *   ],
 *   identificationKey: '3ABCD123XBDC0447',
 *   identificationKeyType: 'nlisid',
 * };
 *
 * const eventUrl = createEPCISTransactionEvent(params);
 * // Returns: http://localhost/nlisid/3ABCD123XBDC0447?linkType=all
 */
declare const createEPCISTransactionEvent: (params: EPCISTransactionEventParams) => Promise<string>;

type Json = {
    [key: string]: any;
};
declare enum BucketName {
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
declare const uploadJson: (filename: string, bucket: BucketName, json: Json) => Promise<string>;

/**
 * integrate with vckit to issue vc with default context and type
 */
declare const integrateVckitIssueVC: ({ context, type, issuer, credentialSubject, restOfVC, }: CredentialPayload) => Promise<VerifiableCredential>;

/**
 * Retrieves the JSON data for the link resolver from the API.
 * @param linkResolverId The ID of the link resolver to retrieve.
 * @returns A Promise that resolves to the JSON data for the link resolver.
 * @throws An error if the API request fails or returns invalid data.
 */
declare const getLinkResolverJsonData: (linkResolver: string) => Promise<any>;

declare const toastSuccess: (message: string) => void;
declare const toastError: (message: string) => void;

declare const theme: {
    color: {
        white: string;
        black: string;
        primary: string;
    };
};

interface IJsonSchema {
    description: string;
    schema: object;
    uischema?: object;
    [key: string]: any;
}
interface ICredentialsIssueJsonSchema {
    [key: string]: IJsonSchema;
}
/**
 * credentialsIssue contains the description and schema of each credential.
 */
declare const credentialsIssue: ICredentialsIssueJsonSchema;

declare function convertBase64ToString(base64: string): string;
declare function detectDevice(userAgent: string): "mobile" | "laptop" | "unknown";
/**
 * @returns a random string of 5 characters
 */
declare function randomString(): string;
declare function generateUUID(): string;
declare function splitStringByDash(string: string): string[];
declare function extractStringFromURL(url: string): string;
declare function getCurrentGMTDateTime(): string;
declare const typeOf: (value: any) => string;

/**
 * Config Axios instance with default value and use it to make http request
 */
declare class BaseAPI {
    protected axiosInstance: AxiosInstance;
    constructor();
    /**
     * Set bearer token authorization headers for axios instance
     * @param token
     */
    setBearerTokenAuthorizationHeaders(token: string): void;
    /**
     * Set content type header for axios instance
     * @param contentType
     */
    setContentTypeHeader(contentType: string): void;
    /**
     * Handle response from axios instance with method like get, post, put
     * @param response
     * @returns response data
     */
    handleResponse(response: AxiosResponse): any;
    /**
     * Make get request with axios instance
     * @param url
     * @param config change default config of axios instance
     * @returns response data or error
     */
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<any>;
    /**
     * Make post request with axios instance
     * @param url
     * @param data body of request
     * @param config change default config of axios instance
     * @returns response data or error
     */
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;
    /**
     * Make put request with axios instance
     * @param url
     * @param data body of request
     * @param config change default config of axios instance
     * @returns response data or error
     */
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any>;
}
/**
 * Public API for making http request without authorization
 */
declare class PublicAPI extends BaseAPI {
    private static instance;
    constructor();
    static getInstance(): PublicAPI;
}
/**
 * Private API for making http request with authorization
 */
declare class PrivateAPI extends BaseAPI {
    private static instance;
    constructor();
    static getInstance(): PrivateAPI;
}
declare const publicAPI: PublicAPI;
declare const privateAPI: PrivateAPI;

export { BucketName, _default$1 as CustomDialog, type DLRResponse, type EPCIS, type EPCISEvent, EPCISEventAction, EPCISEventDisposition, EPCISEventType, type EPCISTransactionEventParams, ErrorText, Footer, type GS1Link, type GS1LinkResolver, type GS1LinkResponse, type GS1LinkSet, type GS1LinkSetBase, GS1LinkType, Header, type IScannerRef, IdentificationKeyType, IssueFormWrap, IssuerDropdown, type Item, type JsonFormData, type LinkResolver, type LinkResponse, LinkType, LoadingWithText, MANDATORY_CONTEXTS, MessageText, MimeType, type Party, RenderJsonSchema, _default as Scanner, Status, type Transaction, contextDefault, convertBase64ToString, createEPCISTransactionEvent, createLinkResolver, credentialsIssue, defaultIssueFormValue, defaultVerificationServiceLink, detectDevice, encryptedService, extractStringFromURL, generateUUID, getCurrentGMTDateTime, getLinkResolverJsonData, integrateVckitIssueVC, privateAPI, publicAPI, randomString, splitStringByDash, theme, toastError, toastSuccess, typeDefault, typeOf, uploadJson };
