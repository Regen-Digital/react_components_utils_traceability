import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RenderJsonSchema from '../../RenderJsonSchema/RenderJsonSchema';
import { act } from 'react-dom/test-utils';

describe('render json schema component', () => {
    const schema = {
        type: 'object',
        properties: {
            string: {
                type: 'string',
            },
            boolean: {
                type: 'boolean',
                description: 'Boolean description as a tooltip',
            },
        },
    };

    beforeEach(() => {
        /*
         * JSONForms package uses `Hidden of Material UI` which does not output anything depending on the queries/environment
         * In our tests, we need to mock the `matchMedia` to render the UI of JSONForms
         * Ref: https://jsonforms.discourse.group/t/jsonforms-unit-test-renders-empty-div/1436
         */
        window.matchMedia = jest.fn().mockImplementation((query) => {
            return {
                matches: true,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            };
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render component with schema props', async () => {
        render(<RenderJsonSchema schema={schema} onChangeJsonSchemaForm={jest.fn()} />);
        const getStringField = screen.getByLabelText('String');
        expect(getStringField).not.toBeNull();
        const getBooleanField = screen.getByLabelText('Boolean');
        expect(getBooleanField).not.toBeNull();
    });

    const uischema = {
        type: 'VerticalLayout',
        elements: [
            {
                type: 'Control',
                scope: '#/properties/string',
            },
            {
                type: 'Control',
                scope: '#/properties/boolean',
            },
        ],
    };
    it('should render component with schema and ui schema props', async () => {
        render(<RenderJsonSchema schema={schema} uiSchema={uischema} onChangeJsonSchemaForm={jest.fn()} />);
        const getStringField = screen.getByLabelText('String');
        expect(getStringField).not.toBeNull();
        const getBooleanField = screen.getByLabelText('Boolean');
        expect(getBooleanField).not.toBeNull();
    });

    it('should render component with schema, ui schema and initial data props', async () => {
        const data = {
            string: 'This is a string',
            boolean: true,
        };
        render(
            <RenderJsonSchema
                schema={schema}
                uiSchema={uischema}
                initialData={data}
                onChangeJsonSchemaForm={jest.fn()}
            />,
        );
        const getStringField = screen.getByLabelText('String');
        expect(getStringField).toHaveValue('This is a string');
        const getBooleanField = screen.getByLabelText('Boolean');
        expect(getBooleanField).toBeChecked();
    });

    it('should display value when input on label', async () => {
        render(<RenderJsonSchema schema={schema} onChangeJsonSchemaForm={jest.fn()} />);
        const getStringField = screen.getByLabelText('String');
        expect(getStringField).not.toBeNull();

        act(() => {
            fireEvent.change(getStringField, { target: { value: 'This is a string' } });
        });
        expect(getStringField).toHaveValue('This is a string');

        act(() => {
            fireEvent.change(getStringField, { target: { value: '' } });
        });
        expect(getStringField).toHaveValue('');

        const getBooleanField = screen.getByLabelText('Boolean');
        expect(getBooleanField).not.toBeNull();

        act(() => {
            fireEvent.click(getBooleanField);
        });
        expect(getBooleanField).toBeChecked();

        act(() => {
            fireEvent.click(getBooleanField);
        });
        expect(getBooleanField).not.toBeChecked();
    });
});
