import { Status } from '../../models';
/**
 *
 * MessageText component is used to display a message and icon with status and text
 */
type PropsWithChildren = {
    status?: Status;
    text: string;
};
export default function MessageText({ status, text }: PropsWithChildren): import("react/jsx-runtime").JSX.Element;
export {};
