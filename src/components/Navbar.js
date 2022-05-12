import {AppBar, Button, Drawer, IconButton, makeStyles, MenuItem, Toolbar, Typography,} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, {useEffect, useState} from "react";
import FindInPageOutlinedIcon from "@material-ui/icons/FindInPageOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

// Navbar Tabs
let headersData = [
    {
        label: "Scout",
        href: "/",
        icon: <FindInPageOutlinedIcon/>,
    },
    {
        label: "TBA",
        href: "/tba",
        icon: <InfoOutlinedIcon/>,
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
        color: "#FFFEFE",
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
    const {header, logo, menuButton, toolbar, drawerContainer} = useStyles();

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    const {mobileView, drawerOpen} = state;

    // Determing mobile view or desktop view
    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({...prevState, mobileView: true}))
                : setState((prevState) => ({...prevState, mobileView: false}));
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
                <div>{getMenuButtons()}</div>
            </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({...prevState, drawerOpen: true}));
        const handleDrawerClose = () =>
            setState((prevState) => ({...prevState, drawerOpen: false}));

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
                    <MenuIcon/>
                </IconButton>

                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>

                <div>{hammerheadLogo}</div>
            </Toolbar>
        );
    };

    const getDrawerChoices = () => {
        return headersData.map(({label, href, icon}) => {
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
        <Typography variant="h6" component="h1" className={logo}>
            226 Scouting Portal
        </Typography>
    );

    const getMenuButtons = () => {
        return headersData.map(({label, href, icon}) => {
            return (
                <Button
                    {...{
                        key: label,
                        color: "white",
                        className: menuButton,
                    }}
                    onClick={() => window.location.replace(href)}
                >
                    <IconButton
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                        color="secondary"
                    >
                        {icon}
                    </IconButton>
                    {label}
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
