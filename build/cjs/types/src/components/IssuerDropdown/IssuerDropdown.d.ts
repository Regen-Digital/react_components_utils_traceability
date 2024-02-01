import * as React from 'react';
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
export default IssuerDropdown;
