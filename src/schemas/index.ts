import DigitalivestockPassport from './DigitalivestockPassport.json';
import DigitalivestockPassportConsignment from './DigitalivestockPassportConsignment.json';
import NationalVendorDeclaration from './NationalVendorDeclaration.json';

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
export const credentialsIssue: ICredentialsIssueJsonSchema = {
    DigitalLivestock: {
        description: 'DigitalLivestock',
        ...DigitalivestockPassport,
    },
    DigitalLivestockConsignment: {
        description: 'DigitalLivestockConsignment',
        ...DigitalivestockPassportConsignment,
    },
    NationalVendorDeclaration: {
        description: 'NationalVendorDeclaration',
        ...NationalVendorDeclaration,
    },
};
