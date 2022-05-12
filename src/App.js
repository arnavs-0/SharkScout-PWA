import "./App.css";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FormPage from "./pages/FormPage";
import Qrcode from "./pages/QRCode";
import NavBar from "./components/Navbar";
import {Container, createTheme, makeStyles, ThemeProvider, Typography} from "@material-ui/core";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Search from "./components/tba/Search";
import ReactFirebaseFileUpload from "./pages/imageUpload";
import Page404 from "./pages/404";
import ScoreBreakdown from "./components/tba/ScoreBreakdown";
import {Alert} from "@material-ui/lab";
import Config from "./utils/config.json";

function App() {
    const darkTheme = createTheme({
        palette: {
            type: "light",
            primary: {
                main: "#026ca0",
            },
            secondary: {
                main: "#ffffff",
            },
        },
    });

    const useStyles = makeStyles({
        root: {
            color: 'white'
        },
    });
    const styles = useStyles();
    return (
        <ThemeProvider theme={darkTheme}>
            <Router>
                <div className="App">
                    <ToastContainer/>
                    <NavBar/>
                    <Alert severity="info">Version: {Config.version}</Alert>

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
            <footer className="footer">
                <Typography className={styles.root} align="center">
                    <strong> {'\u00A9'} {new Date().getFullYear()} Team 226 - The Hammerheads </strong>
                    <br />
                    <strong>Version:</strong> {Config.version}
                </Typography>
            </footer>
        </ThemeProvider>
    );
}

export default App;
