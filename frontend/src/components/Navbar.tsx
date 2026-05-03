import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../context/Auth/AuthContext";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { username, isAuthenticated, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const navigate = useNavigate();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlelogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{ display: "flex", direction: "row", alignItems: "center" }}
            >
              <AdbIcon sx={{ display: "flex", mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                Tech
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                direction: "row",
                alignItems: "center",
              }}
            >
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <>
                      <Typography sx={{ mr: 2 }}>{username}</Typography>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={username || "User"}
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </>
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
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        MY Orders
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography sx={{ textAlign: "center" }}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlelogin}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
