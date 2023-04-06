import React, { useState } from "react";
import firebase from "firebase";
import {
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { goToHome } from "../modules/Router";

// TODO: Fix
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));


export default function ReactFirebaseFileUpload() {
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [team, setTeam] = useState("");
  const [files, setFiles] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [canSubmit, setCanSubmit] = React.useState(true);

  const handleChange = (e) => {
    setFiles(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };


  const storage = firebase.storage();
  const db = firebase.database();

  const handleUpload = () => {
    const promises = [];
    let number;
    if (team === "") {
      number = "unlabeled";
    } else {
      number = team;
    }
    images.forEach((image) => {
      const uploadTask = storage
        .ref(`msc-consumers/${number}/${image.name}`)
        .put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref(`msc-consumers/${number}`)
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              db.ref(
                `msc-consumers/${number}/${Math.round(Math.random() * 1000)}`
              ).set({
                url: urls,
              });

            });
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        setSnackbarMessage("All Images Uploaded to Firebase");
      })
      .catch(() => {
        setSnackbarMessage("Error Uploading Images");
      });
  };



  const classes = useStyles();
  return (
    <div>
      <br />
      <LinearProgress variant="determinate" value={progress} />
      <br />
      <br />
      <Button variant="outlined" color="primary" onClick={() => goToHome()}>
        Go Home
      </Button>
      <br />
      <br />
      <br />
      <TextField
        label="Team Number"
        variant="outlined"
        onChange={(event) => {
          setTeam(event.target.value);
          if (event.target.value !== "" && !/[^0-9]/.test(event.target.value))
            setCanSubmit(false);
          else setCanSubmit(true);
        }}
      />
      <br></br>
      <br />
      <div className={classes.root}>
        <input
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          accept="image/*, video/*"
          onChange={handleChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            disabled={canSubmit}
          >
            Upload Files
          </Button>
          <Typography variant="p" color="primary" style={{ margin: "10px" }}>
            {files} file(s) selected
          </Typography>
        </label>
      </div>

      <br></br>
      <Button
        variant="contained"
        color="primary"
        disabled={canSubmit}
        onClick={handleUpload}
      >
        Submit to Firebase
      </Button>
      <br />
      <br />
      <Typography
      style={{ fontWeight: "bold" }}
        variant="p"
        color="primary"
      >
        {snackbarMessage}
      </Typography>
    </div>
  );
}
