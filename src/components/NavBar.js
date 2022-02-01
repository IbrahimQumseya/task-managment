import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pages, settings } from "../asserts/data";
import useToken from "./useToken";
function NavBar() {
  let navigate = useNavigate();
  const { token, setToken } = useToken();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
    console.log(e);
  };
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
    console.log(e.currentTarget);
  };

  const handleCloseNavMenu = (page, e) => {
    console.log(page.path);
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
  const handleCloseUserMenu = (name) => {
    if (name === "Logout" && token) {
      setToken("");
      sessionStorage.clear();
      navigate("/login");
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
                if (page.id > 2 && token) {
                  return (
                    <MenuItem
                      key={page.id}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  );
                }
                if (!token && page.id < 3) {
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
                if (token && page.id > 2) {
                  console.log(page.id);
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
                if (!token && page.id < 3) {
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

          {token && (
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
