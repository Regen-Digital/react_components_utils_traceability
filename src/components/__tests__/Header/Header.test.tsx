import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Header from '../../Header/Header';

const routerLinks = [
  { title: 'Digital Livestock', path: '/' },
  { title: 'Farm', path: '/farm' },
  { title: 'Farmers', path: '/farmers' },
];

describe('Header', () => {
  const routerLinks = [
    { title: 'Digital Livestock', path: '/' },
    { title: 'Farm', path: '/farm' },
    { title: 'Farmers', path: '/farmers' },
  ];

  test('render header when large screen', () => {
    global.innerWidth = 1024;
    render(<Header routerLinks={routerLinks} />);
    expect(screen.getByTestId('menu-desktop')).toBeVisible();
    expect(screen.getAllByText(/Farm/i)[0]).not.toBeNull();
  });

  test('render menu when click button', () => {
    global.innerWidth = 600;
    render(<Header routerLinks={routerLinks} />);

    const iconButton = screen.getByTestId('icon-button');
    expect(iconButton).toBeVisible();
    fireEvent.click(iconButton);

    expect(screen.getByTestId('menu-appbar')).toHaveStyle('display: block');
  });

  test('closes mobile menu when menu items are clicked', async () => {
    global.innerWidth = 600;
    render(<Header routerLinks={routerLinks} />);

    // Simulate clicking the mobile menu icon to open the menu
    const iconButton = screen.getByTestId('icon-button');
    fireEvent.click(iconButton);
    // After clicking, the mobile menu should be visible
    const mobileMenu = screen.getByTestId('menu-appbar');
    expect(mobileMenu).toHaveStyle('display: block');

    // Simulate clicking a menu item to close the menu
    const barcodeMenuItem = screen.getByRole('link', {
      name: 'Digital Livestock',
    });
    fireEvent.click(barcodeMenuItem);
    await waitFor(() => {
      expect(screen.getByTestId('menu-appbar')).toHaveClass('MuiModal-hidden ');
    });
  });
});
