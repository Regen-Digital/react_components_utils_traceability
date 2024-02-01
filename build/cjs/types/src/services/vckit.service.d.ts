import { CredentialPayload, VerifiableCredential } from '@vckit/core-types';
/**
 * integrate with vckit to issue vc with default context and type
 */
export declare const integrateVckitIssueVC: ({ context, type, issuer, credentialSubject, restOfVC, }: CredentialPayload) => Promise<VerifiableCredential>;
