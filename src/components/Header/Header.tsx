import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Stack,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { BrowserRouter, Link } from 'react-router-dom';
import { theme } from '../../constants/theme';

interface IHeader {
  routerLinks: { title: string; path: string }[];
}

interface IHeader {
  routerLinks: { title: string; path: string }[];
}

/**
 * Header component is used to display the header and navigation to other pages
 */
const Header = ({ routerLinks }: IHeader) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  /**
   * open nav menu on mobile.
   */
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  /**
   * close nav menu on mobile.
   */
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <BrowserRouter>
      <AppBar sx={{ background: theme.color.white }}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            {/* Logo on desktop or tablet */}
            <Stack
              component={Link}
              to='/'
              sx={{
                textDecoration: 'none',
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                flexDirection: 'row',
                mr: 2,
              }}
            >
              <Typography
                variant='h6'
                sx={{
                  color: theme.color.black,
                }}
              >
                Farm
              </Typography>
            </Stack>
            {/* Menu on mobile */}
            <Box
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              data-testid='menu'
            >
              <IconButton
                data-testid='icon-button'
                size='small'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon sx={{ color: theme.color.black }} />
              </IconButton>
              <Menu
                data-testid='menu-appbar'
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {routerLinks.map((page) => (
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign='center'
                      component={Link}
                      to={page.path}
                      sx={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {page.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* Logo on mobile */}
            <Stack
              component={Link}
              to='/'
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                display: { xs: 'flex', md: 'none' },
                flexDirection: 'row',
                margin: 'auto',
              }}
            >
              <Typography
                variant='h6'
                sx={{
                  color: theme.color.black,
                }}
              >
                Farm
              </Typography>
            </Stack>
            {/* Menu item on  desktop or tablet */}
            <Box
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
              data-testid='menu-desktop'
            >
              {routerLinks.map((page) => (
                <Button
                  key={page.title}
                  component={Link}
                  to={page.path}
                  sx={{ color: theme.color.black, display: 'block' }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </BrowserRouter>
  );
};

export default Header;
