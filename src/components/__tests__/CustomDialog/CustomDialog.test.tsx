import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CustomDialog from '../../CustomDialog/CustomDialog';

describe('Custom Dialog component', () => {
    test('should render dialog title correctly', () => {
        const mockFn = jest.fn();
        render(<CustomDialog title='Product not found' open={true} onClose={mockFn} />);
        const text = screen.getByText(/Product not found/i);
        expect(text).not.toBeNull();
    });

    test('should render custom dialog content correctly', () => {
        const mockFn = jest.fn();
        const content = <div>Product not found</div>;
        render(<CustomDialog content={content} open={true} onClose={mockFn} />);
        const text = screen.getByText(/Product not found/i);
        expect(text).not.toBeNull();
    });

    test('should render custom dialog actions correctly', () => {
        const mockFn = jest.fn();
        const buttons = (
            <>
                <button>Verify</button>
            </>
        );
        render(<CustomDialog buttons={buttons} open={true} onClose={mockFn} />);
        const verifyButton = screen.getByText(/Verify/i);
        expect(verifyButton).not.toBeNull();
    });

    test('handles custom dialog actions', () => {
        const mockFn = jest.fn();
        const buttons = (
            <>
                <button onClick={mockFn}>Verify</button>
            </>
        );
        render(<CustomDialog buttons={buttons} open={true} onClose={mockFn} />);
        const verifyButton = screen.getByText(/Verify/i);
        fireEvent.click(verifyButton);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('should render style correctly', () => {
        const mockFn = jest.fn();
        const dialogStyle = {
            content: {
                width: '500px',
                maxWidth: '80%',
            },
            title: {
                color: 'red',
            },
        };

        const content = 'Content testing';

        render(
            <CustomDialog title='Title testing' content={content} style={dialogStyle} open={true} onClose={mockFn} />,
        );
        expect(screen.getByText(/Title testing/i)).toHaveStyle('color: red');
        expect(screen.getByText(/Content testing/i)).toHaveStyle('maxWidth: 80%');
    });

    test('should handler logic in close button', () => {
        const onClose = jest.fn(() => {
            console.log('hi');
        });
        const spy = jest.spyOn(console, 'log');

        render(<CustomDialog open={true} onClose={onClose} />);
        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('hi');
        spy.mockRestore();
    });
});
