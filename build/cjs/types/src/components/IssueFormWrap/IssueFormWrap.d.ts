import { CredentialPayload, VerifiableCredential } from '@vckit/core-types';
import { JsonFormData } from '../../models/common';
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
declare const IssueFormWrap: ({ dynamicSchema, formName, processor }: IIssueFormWrapProps) => import("react/jsx-runtime").JSX.Element;
export default IssueFormWrap;
