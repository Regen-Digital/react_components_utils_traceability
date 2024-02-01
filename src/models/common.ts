export const enum ErrorText {
  required = 'is a required property',
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

export const defaultIssueFormValue: IssueFormValue = {
  DigitalLivestock: {
    listNameFile: 'dlp',
    title: 'Digital Livestock',
  },
  DigitalLivestockConsignment: {
    listNameFile: 'dlp-consignment',
    title: 'Digital Livestock Consignment',
  },
  NationalVendorDeclaration: {
    listNameFile: 'envd-vc',
    title: 'National Vendor Declaration',
  },
};

export enum Status {
  success = 'success',
  error = 'error',
}

export interface IScannerRef {
  closeQrCodeScanner: () => void;
}
