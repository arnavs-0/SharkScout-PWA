import React, { Component } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import FormSelection from "../components/home/FormSelection";
import { Offline, Online } from "react-detect-offline";
import { googleSignIn, handleSignOut } from "../services/Auth";
import { v4 as uuidv4 } from "uuid";
import {
  login,
  removeItem,
  setLogin,
  setOffline,
  setUid,
  uid,
} from "../modules/LocalDB";
import LoadingButton from "@mui/lab/LoadingButton";
import { goToForm, goToUpload } from "../modules/Router";
import { ToastContainer } from "react-toastify";
import firebase from "firebase";
import "react-toastify/dist/ReactToastify.css";
import TBALoader from "../components/TBALoader";

class Home extends Component {
  componentDidMount() {
    removeItem("offline");
    if (!uid) {
      setUid(uuidv4());
    }
  }

  render() {
    function handleClick(online) {
      if (online === "online" && !login) {
        googleSignIn(online);
      } else if (login && online === "online") {
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
          style={{ textAlign: "center", margin: "30px" }}
        >
          Choose a Form
        </Typography>

        <Grid
          container
          spacing={0}
          align="center"
          justify="center"
          direction="column"
        >
          <Grid item xs={4} sx={{ justifyContent: "center" }}>
            <Offline>
              <FormSelection
                main="Offline 2023 Match Scouting"
                second="In-Person Match Scouting"
                onClick={() => handleClick("offline")}
              />
              <FormSelection
                main="Offline 2023 Pit Scouting"
                second="In-Person Pit Scouting"
                onClick={() => handleClick("offlinePit")}
              />
            </Offline>
            <Online>
              <FormSelection
                main="Online 2023 Match Scouting"
                second="In-Person Match Scouting"
                onClick={() => handleClick("offline")}
              />
              <FormSelection
                main="Offline 2023 Pit Scouting"
                divider
                second="In-Person Pit Scouting"
                onClick={() => handleClick("offlinePit")}
              />
              <Typography
                variant="p"
                style={{ textAlign: "center", margin: "30px" }}
              >
                <strong>Or Upload Pit Scouting Data</strong>
              </Typography>
              <FormSelection
                main="Upload Robot Images"
                second="Pit Scouting"
                online
                onClick={handleUpload}
              />
              {login ? <Button onClick={handleSignOut}>Logout</Button> : null}
              <TBALoader />
            </Online>
          </Grid>
        </Grid>
        <ToastContainer />
      </div>
    );
  }
}

export default Home;
