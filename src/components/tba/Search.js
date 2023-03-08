import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, List, TextField, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ResetIcon from "@mui/icons-material/RotateLeft";
import axios from "axios";
import OPRS from "./OPRS";
import { Offline, Online } from "react-detect-offline";
import Config from "../../utils/config.json";
import { goToScoreBreakdown } from "../../modules/Router";

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

function Search(props) {
  const [data, setData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState();

  const handleChange = (event, value) => {
    const toLower = Function.prototype.call.bind(String.prototype.toLowerCase);
    setSelectedOptions(toLower(value));
  };
  const classes = useStyles();

  async function formSubmitHandler(event) {
    event.preventDefault();
    const formInputs = event.target;
    const searchParams = {
      [formInputs[0].name]: formInputs[0].value,
    };
    const point = selectedOptions;
    let query;
    if (point === "oprs" || point === "dprs" || point === "ccwms") {
      query = "oprs";
    }
    let config = {
      headers: {
        "Content-Type": "application/json",
        "X-TBA-Auth-Key": Config.tba_key,
      },
    };
    const url =
      "https://www.thebluealliance.com/api/v3/event/" +
      formInputs[0].value +
      "/" +
      query;
    const response = await axios.get(url, config);
    let res;
    if (point === "oprs") {
      res = response.data.oprs;
    } else if (point === "dprs") {
      res = response.data.dprs;
    } else if (point === "ccwms") {
      res = response.data.ccwms;
    }
    setData(res);
    console.log(searchParams);
  }

  const choices = ["OPRS", "DPRS", "CCWMS"];

  return (
    <div>
      <Online>
        <br />
        <Button
          color="primary"
          variant="outlined"
          onClick={() => goToScoreBreakdown()}
        >
          Score Breakdowns
        </Button>
        <form
          className={classes.root}
          onSubmit={(event) => formSubmitHandler(event)}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Event or Team ID"
            name="event"
            variant="outlined"
            size="small"
            placeholder="ex. 2020misjo"
            value={Config.tba_eventid}
          />

          <Autocomplete
            id="combo-box-demo"
            options={choices}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Endpoint"
                name="endpoint"
                variant="outlined"
                size="small"
              />
            )}
          />
          <div className={classes.buttonContainer}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              startIcon={<ResetIcon />}
            >
              Reset
            </Button>
          </div>
        </form>
        <Grid container direction="row" spacing={2}>
          {data &&
            Object.entries(data).map(([key, values], index) => {
              return (
                <Grid item xs className={classes.container}>
                  <List className={classes.list}>
                    <OPRS primary={key} secondary={values} />
                  </List>
                </Grid>
              );
            })}
        </Grid>
      </Online>
      <Offline>
        <p>You are not connected to the internet!</p>
      </Offline>
    </div>
  );
}

export default Search;
