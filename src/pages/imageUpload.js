import React, {useState} from "react";
import firebase from "firebase";
import {Button, LinearProgress, makeStyles, Snackbar, TextField, Typography,} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {goToHome} from "../modules/Router";

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ReactFirebaseFileUpload() {
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const [team, setTeam] = useState("");
    const [files, setFiles] = useState(0);
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

    const handleChange = (e) => {
        setFiles(e.target.files.length);
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    function handleClose() {
        setSnackbar(false);
    }

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
                .ref(`msc-images/${number}/${image.name}`)
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
                        .ref(`images/${number}`)
                        .child(image.name)
                        .getDownloadURL()
                        .then((urls) => {
                            db.ref(
                                `images/${number}/${Math.round(Math.random() * 1000)}`
                            ).set({
                                url: urls,
                            });
                            setUrls((prevState) => [...prevState, urls]);
                        });
                }
            );
        });

        Promise.all(promises)
            .then(() => {
                setSnackbarMessage("All Images Uploaded to Firebase");
                setSnackbar(true);
            })
            .catch((err) => {
                setSnackbarMessage("Error Uploading Images");
                setSnackbarSeverity("error");
                setSnackbar(true);
            });
    };

    console.log("images: ", images);
    console.log("urls", urls);

    const classes = useStyles();
    return (
        <div>
            <br/>
            <LinearProgress variant="determinate" value={progress}/>
            <br/>
            <br/>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => goToHome()}
            >
                Go Home
            </Button>
            <br/>
            <br/>
            <br/>
            <TextField
                label="Team Number"
                variant="outlined"
                onChange={(event) => {
                    setTeam(event.target.value);
                }}
            />
            <br></br>
            <br/>
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
                    <Button variant="contained" color="primary" component="span">
                        Upload Files
                    </Button>
                    <Typography variant="p" color="primary" style={{margin: "10px"}}>
                        {files} file(s) selected
                    </Typography>
                </label>
            </div>

            <br></br>
            <Button variant="contained" color="primary" onClick={handleUpload}>
                Submit to Firebase
            </Button>
            <br/>
            <br/>
            {urls.map((url, i) => (
                <img
                    key={i}
                    style={{width: "100%", height: "100%"}}
                    src={url || "http://via.placeholder.com/300"}
                    alt="firebase-uploaded"
                />
            ))}
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                open={snackbar}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbarSeverity}
                    sx={{width: "100%"}}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
