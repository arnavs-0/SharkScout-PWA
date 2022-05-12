import React, {Component} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import FormSelection from "../components/home/FormSelection";
import {Offline, Online} from "react-detect-offline";
import {googleSignIn, handleSignOut} from "../services/Auth";
import {v4 as uuidv4} from "uuid";
import {login, removeItem, setLogin, setOffline, setUid, uid} from "../modules/LocalDB"
import {goToForm, goToUpload} from "../modules/Router";
import {ToastContainer} from 'react-toastify';
import firebase from "firebase";
import 'react-toastify/dist/ReactToastify.css';

class Home extends Component {

    componentDidMount() {
        removeItem("offline")
        if (!uid) {
            setUid(uuidv4());
        }
    }

    render() {
        function handleClick(online) {
            if (online === "online" && (!login)) {
                googleSignIn(online);
            } else if (
                login &&
                online === "online"
            ) {
                setOffline(online.toString());
                goToForm();
            } else {
                setOffline(online.toString());
                goToForm();
            }
        }

        function handleUpload() {
            if (!login) {
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then((result) => {
                        setLogin(result.user.uid);
                        goToUpload();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                goToUpload();
            }
        }

        return (
            <div>
                <Typography
                    variant={"h6"}
                    style={{textAlign: "center", margin: "30px"}}
                >
                    Choose a Form
                </Typography>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Offline>
                        <FormSelection
                            main="Offline 2022 Match Scouting"
                            second="In-Person Match Scouting"
                            onClick={() => handleClick("offline")}
                        />
                        <FormSelection
                            main="Offline 2022 Pit Scouting"
                            second="In-Person Pit Scouting"
                            onClick={() => handleClick("offlinePit")}
                        />
                    </Offline>
                    <Online>
                        <FormSelection
                            main="MSC Match Scouting"
                            second="In-Person Match Scouting"
                            onClick={() => handleClick("offline")}
                        />
                        <FormSelection
                            main="Offline 2022 Pit Scouting"
                            divider
                            second="In-Person Pit Scouting"
                            onClick={() => handleClick("offlinePit")}
                        />
                        <FormSelection
                            main="Online 2022 Match Scouting"
                            second="Online Match Scouting"
                            online
                            onClick={() => handleClick("online")}
                        />
                        <br/>
                        <Typography
                            variant="p"
                            style={{textAlign: "center", margin: "30px"}}
                        >
                            <strong>Or Upload Pit Scouting Data</strong>
                        </Typography>
                        <FormSelection
                            main="Upload Robot Images"
                            second="Pit Scouting"
                            online
                            onClick={handleUpload}
                        />
                        {login ? (
                            <Button onClick={handleSignOut}>Logout</Button>
                        ) : null}
                    </Online>
                </Grid>
                <ToastContainer/>
            </div>
        );
    }
}

export default Home;
