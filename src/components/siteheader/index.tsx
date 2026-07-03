import React, { useState, MouseEvent, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  
  const publicMenuOptions = [
    { label: "Login", path: "/" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Upcoming", path: "/movies/upcoming" },
  ];
  const privateMenuOptions = [
    { label: "Home", path: "/home" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Must Watch", path: "/movies/mustwatch" },
    { label: "TV Series", path: "/tv" },
    { label: "Favourite TV Series", path: "/tv/favourites" },
  ];
  
  const menuOptions = isAuthenticated
  ? [...privateMenuOptions, { label: "Logout", path: "/logout" }]
  : publicMenuOptions;
  
  const handleMenuSelect = (pageURL: string) => {
    setAnchorEl(null);
    if (pageURL === "/logout") {
      logout();
      navigate("/");
    } else {
      navigate(pageURL);
    }
  };
  
  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  return (
    <>
    <AppBar position="fixed" elevation={0} color="primary">
    <Toolbar>
    <Typography variant="h4" sx={styles.title}>
    TMDB Client
    </Typography>
    <Typography variant="h6" sx={styles.title}>
    All you ever wanted to know about Movies!
    </Typography>
    {isMobile ? (
      <>
      <IconButton
      aria-label="menu"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleMenu}
      color="inherit"
      size="large"
      >
      <MenuIcon />
      </IconButton>
      <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      onClose={() => setAnchorEl(null)}
      >
      {menuOptions.map((opt) => (
        <MenuItem
        key={opt.label}
        onClick={() => handleMenuSelect(opt.path)}
        >
        {opt.label}
        </MenuItem>
      ))}
      </Menu>
      </>
    ) : (
      <>
      {menuOptions.map((opt) => (
        <Button
        key={opt.label}
        color="inherit"
        onClick={() => handleMenuSelect(opt.path)}
        >
        {opt.label}
        </Button>
      ))}
      </>
    )}
    </Toolbar>
    </AppBar>
    <Offset />
    </>
  );
};

export default SiteHeader;