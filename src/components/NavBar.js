import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { languages, pages, settings } from '../asserts/data';
import LanguageIcon from '@mui/icons-material/Language';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { fetchGetUserDetails } from '../api/userAPI';
function NavBar() {
  //setIsAuthenticated and isAuthenticated
  let navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const token = sessionStorage.getItem("user");

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = (page, e) => {
    if (
      page.path === "/login" ||
      page.path === "/register" ||
      page.path === "/home" ||
      page.path === "/"
    ) {
      navigate(page.path);
      setAnchorElNav(null);
    }
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = (e, name) => {
    if (e === 'Logout' && token) {
      dispatch(logout());
      sessionStorage.clear();
      navigate("/login");
    }
    console.log(e);
    if (e === 'Profile') {
      dispatch(fetchGetUserDetails());
      navigate('/user/profile');
    }
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              id="buttonMenu"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                if (page.id > 2 && isAuthenticated) {
                  return (
                    <MenuItem
                      key={page.id}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  );
                }
                if (!isAuthenticated && page.id < 3) {
                  return (
                    <MenuItem
                      key={page.id}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {
              // error here!
              pages.map((page) => {
                if (isAuthenticated && page.id > 2) {
                  return (
                    <Button
                      key={page.id}
                      onClick={() => handleCloseNavMenu(page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.name}
                    </Button>
                  );
                }
                if (!isAuthenticated && page.id < 3) {
                  return (
                    <Button
                      key={page.id}
                      onClick={() => handleCloseNavMenu(page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.name}
                    </Button>
                  );
                }
                // else {
                //   return (
                //     <Button
                //       key={page.id}
                //       onClick={() => handleCloseNavMenu(page)}
                //       sx={{ my: 2, color: "white", display: "block" }}
                //     >
                //       {page.name}
                //     </Button>
                //   );
                // }
              })
            }
          </Box>

          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.id}
                    onClick={() => handleCloseUserMenu(setting.name)}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
