import {
  AppBar,
  Drawer,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../App";

// Navbar Tabs
let headersData = [
  {
    label: "Scout",
    href: "/",
    icon: <FindInPageOutlinedIcon />,
  },
  {
    label: "TBA",
    href: "/tba",
    icon: <InfoOutlinedIcon />,
  },
];

// Navbar Styles
const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#0288d1",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "roboto, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "roboto, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

export default function NavBar() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const setMode = () => {
    colorMode.toggleColorMode();
    localStorage.setItem(
      "darkMode",
      theme.palette.mode === "dark" ? "light" : "dark"
    );
  };

  const { mobileView, drawerOpen } = state;

  // Determing mobile view or desktop view
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {hammerheadLogo}
        <div>
          {getMenuButtons()}
          <IconButton
            sx={{ ml: 1 }}
            onClick={setMode}
            className={menuButton}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "white",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
          <IconButton sx={{ ml: 1 }} onClick={setMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Drawer>

        <div>{hammerheadLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href, icon }) => {
      return (
        <MenuItem onClick={() => window.location.replace(href)}>
          <IconButton
            disableRipple
            disableFocusRipple
            disableTouchRipple
            color="inherit"
          >
            {icon}
          </IconButton>
          {label}
        </MenuItem>
      );
    });
  };

  const hammerheadLogo = (
    <Typography
      variant="h6"
      component="h1"
      className={logo}
      style={{ fontWeight: "bold" }}
    >
      SharkScout PWA
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href, icon }) => {
      return (
        <Button
          {...{
            key: label,
            className: menuButton,
          }}
          color="secondary"
          style={{ marginRight: "50px", fontWeight: "bold" }}
          onClick={() => window.location.replace(href)}
          startIcon={icon}
        >
          <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
            {label}
          </Typography>
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar position="sticky" className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
