export declare const enum ErrorText {
    required = "is a required property"
}
interface IDefaultValue {
    listNameFile?: string;
    title: string;
}
interface IssueFormValue {
    [key: string]: IDefaultValue;
}
export type JsonFormData = {
    [key: string]: any;
};
export declare const defaultIssueFormValue: IssueFormValue;
export declare enum Status {
    success = "success",
    error = "error"
}
export interface IScannerRef {
    closeQrCodeScanner: () => void;
}
export {};
