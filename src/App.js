import "./App.css";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FormPage from "./pages/FormPage";
import Qrcode from "./pages/QRCode";
import NavBar from "./components/Navbar";
import {Alert, Container, createTheme, CssBaseline, Grid, ThemeProvider, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Search from "./components/tba/Search";
import ReactFirebaseFileUpload from "./pages/imageUpload";
import Page404 from "./pages/404";
import ScoreBreakdown from "./components/tba/ScoreBreakdown";
import Config from "./utils/config.json";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


function App() {
    if (localStorage.getItem("darkMode") === null) localStorage.setItem("darkMode", "light");
    console.log(localStorage.getItem("darkMode"));
    const [mode, setMode] = React.useState(localStorage.getItem("darkMode"));
    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
          localStorage.setItem("darkMode", mode);
        },
      }),
      [mode],
    );

    const theme = React.useMemo(
        () =>
        createTheme({
            palette: {
            mode: mode,
            ...(mode === 'light' ?
                {primary: {
                    main: "#0288d1",
                },
                secondary: {
                    main: "#ffffff",
                }, 
                neutral: {
                    main: "#0288d1",
                },
            } :  {
                    // palette values for dark mode
                    primary: {
                        main: "#0288d1",
                    },
                    neutral: {
                        main: "#212121",
                    },
                  }),
            },
        }),
        [mode],
    );

    const useStyles = makeStyles({
        root: {
            color: "white"
        },
        footer: {
            backgroundColor: theme.palette.neutral.main,
            position: "relative",
            marginTop: "10px",
            bottom: 0,
            width: "100%",
        }
    });
    const styles = useStyles();
    return (
        <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <div className="App">
                    <ToastContainer/>
                    <NavBar/>
                    <Alert style={{margin: '10px'}} severity="info">Version: {Config.version}</Alert>

                    <Container>
                        <Switch>
                            <Route exact path="/">
                               <Home />
                            </Route>
                            <Route exact path="/qrcode">
                                <Qrcode/>
                            </Route>
                            <Route exact path="/form">
                                <FormPage/>
                            </Route>
                            <Route exact path="/tba">
                                <Search/>
                            </Route>
                            <Route exact path="/upload">
                                <ReactFirebaseFileUpload/>
                            </Route>
                            <Route exact path="/scorebreakdown">
                                <ScoreBreakdown/>
                            </Route>
                            <Route component={Page404}/>
                        </Switch>
                    </Container>
                </div>
            </Router>
            <Grid className={styles.footer}>
                <Typography className={styles.root} align="center">
                    <strong> {'\u00A9'} {new Date().getFullYear()} Team 226 - The Hammerheads </strong>
                    <br />
                    <strong>Version:</strong> {Config.version}
                </Typography>
            </Grid>
        </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
