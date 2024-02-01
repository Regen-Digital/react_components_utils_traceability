import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../../Footer/Footer';

describe('Footer', () => {
    test('should render Footer component', () => {
        const { getByText } = render(<Footer />);
        expect(getByText(/Copyright/i)).toBeVisible();
    });
});
