import * as React from 'react';
import { Html5QrcodeResult } from 'html5-qrcode';
import { IScannerRef } from '../../models';
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
export default _default;
