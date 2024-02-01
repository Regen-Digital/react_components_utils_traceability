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
export declare const credentialsIssue: ICredentialsIssueJsonSchema;
export {};
