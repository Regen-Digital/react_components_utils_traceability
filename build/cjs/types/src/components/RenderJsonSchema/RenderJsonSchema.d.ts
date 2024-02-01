import { JsonSchema, UISchemaElement } from '@jsonforms/core';
interface IRenderJsonSchemaProps {
    schema: JsonSchema;
    uiSchema?: UISchemaElement;
    initialData?: any;
    onChangeJsonSchemaForm: ({ errors, data }: {
        errors: any[];
        data: any;
    }) => void;
}
/**
 * Renders a JSON schema using the JSON Forms library.
 */
declare const RenderJsonSchema: ({ schema, uiSchema, initialData, onChangeJsonSchemaForm }: IRenderJsonSchemaProps) => import("react/jsx-runtime").JSX.Element;
export default RenderJsonSchema;
