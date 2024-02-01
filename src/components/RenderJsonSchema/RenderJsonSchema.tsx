import React, { useState } from 'react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Box } from '@mui/material';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';

interface IRenderJsonSchemaProps {
    schema: JsonSchema;
    uiSchema?: UISchemaElement;
    initialData?: any;

    onChangeJsonSchemaForm: ({ errors, data }: { errors: any[]; data: any }) => void;
}

/**
 * Renders a JSON schema using the JSON Forms library.
 */
const RenderJsonSchema = ({ schema, uiSchema, initialData, onChangeJsonSchemaForm }: IRenderJsonSchemaProps) => {
    const [data, setData] = useState(initialData);

    /**
     * onChange is used to update the form data and errors.
     */
    const onChange = ({ errors, data }: { errors: any[]; data: any }) => {
        setData(data);
        onChangeJsonSchemaForm({ data, errors });
    };

    return (
        <Box sx={{ paddingTop: '20px' }}>
            <JsonForms
                schema={schema}
                uischema={uiSchema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={onChange}
            />
        </Box>
    );
};

export default RenderJsonSchema;
