import React from 'react';
import { render, screen } from '@testing-library/react';
import IssueFormWrap from '../../IssueFormWrap/IssueFormWrap';

jest.mock('../../../schemas', () => ({
    credentialsIssue: {
        abc: {
            schema: {},
        },
    },
}));

jest.mock('../../../models/common', () => ({
    defaultIssueFormValue: {
        abc: {
            title: 'abc',
        },
    },
    ErrorText: {
        required: 'is a required property',
    },
}));

jest.mock(
    '../../RenderJsonSchema/RenderJsonSchema',
    () =>
        ({
            initialData = {
                abc: {
                    schema: {},
                },
            },
        }: any) => {
            initialData;

            return <>Schema</>;
        },
);

describe('first', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render issue form wrap component', () => {
        render(<IssueFormWrap formName='abc' processor={jest.fn()} />);
        expect(screen.getByText('abc Passport')).not.toBeNull();
    });

    it('should render issue form wrap component', () => {
        render(<IssueFormWrap formName='abc' processor={jest.fn()} />);
    });
});
