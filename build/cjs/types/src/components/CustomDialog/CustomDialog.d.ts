import React from "react";
export interface IStyle {
    content?: React.CSSProperties;
    title?: React.CSSProperties;
    actions?: React.CSSProperties;
}
interface DialogProps {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    content?: React.ReactNode;
    buttons?: React.ReactNode;
    style?: IStyle;
}
declare const _default: React.MemoExoticComponent<({ open, onClose, title, content, buttons, style, }: DialogProps) => import("react/jsx-runtime").JSX.Element>;
export default _default;
