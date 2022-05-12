import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {Offline, Online} from "react-detect-offline";
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ResetIcon from "@material-ui/icons/RotateLeft";
import ReactJson from "react-json-view";
import Config from "../../utils/config.json";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 20,
        "& > *": {
            margin: theme.spacing(1),
        },
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    buttonContainer: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    list: {
        background: theme.palette.background.paper,
    },
    container: {
        height: "100%", // So that grids 1 & 4 go all the way down
        minHeight: 150, // Give minimum height to a div
        border: "1px solid black",
        fontSize: 30,
        textAlign: "center",
    },
}));

function ScoreBreakdown(){
    const [redJson, setRedJson] = useState(null);
    const [blueJson, setBlueJson] = useState(null)

    const classes = useStyles();

    async function formSubmitHandler(event) {
        event.preventDefault();
        const formInputs = event.target;
        let config = {
            headers: {
                "Content-Type": "application/json",
                "X-TBA-Auth-Key":
                    Config.tba_auth_key,
            },
        };
        const url =
            "https://www.thebluealliance.com/api/v3/match/" +
            Config.tba_eventid +
            formInputs[0].value;
        const response = await axios.get(url, config);
        let blueRes = response.data.score_breakdown.blue
        setBlueJson(blueRes);
        let redRes = response.data.score_breakdown.red
        setRedJson(redRes)
        console.log(response)
    }

    return(
        <div>
            <Online>
                <form
                    className={classes.root}
                    onSubmit={(event) => formSubmitHandler(event)}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Match Number"
                        name="event"
                        variant="outlined"
                        size="small"
                        placeholder="ex. qm10"
                    />

                    <div className={classes.buttonContainer}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            startIcon={<SearchIcon/>}
                        >
                            Search
                        </Button>
                        <Button
                            type="reset"
                            variant="outlined"
                            color="secondary"
                            startIcon={<ResetIcon/>}
                        >
                            Reset
                        </Button>
                    </div>
                </form>
                { blueJson && redJson ?
                    <Grid container direction="row" justify="flex-start" spacing={3}>
                        <Grid item xs={6}>
                            <Typography h2>Blue Alliance Match Data</Typography>
                            <ReactJson src={blueJson} theme="monokai" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography h2>Red Alliance Match Data</Typography>
                            <ReactJson src={redJson} theme="monokai" />
                        </Grid>
                    </Grid> : null}
                <br/>
            </Online>
            <Offline>
                <p>You are not connected to the internet!</p>
            </Offline>
        </div>
    )
}

export default ScoreBreakdown;
