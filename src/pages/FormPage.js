import React, { Component } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import match from "../modules/assets/forms/match.json";
import pit from "../modules/assets/forms/pit.json";
import { ToastContainer } from "react-toastify";
import { offlinePit, offlineSubmit, onlineSubmit } from "../api/API";
import { offline } from "../modules/LocalDB";
import fieldImg from "../modules/assets/img/field.png";
import { withStyles } from "@mui/styles";

function requireAll(r) {
  return r.keys().map(r);
}

const fieldModules = requireAll(
  require.context("../components/form", true, /\.js?$/)
);
const FieldTypes = fieldModules.reduce((obj, mod) => {
  obj[mod.id] = mod.default;
  obj[mod.id].resolveSubmissionValue = mod.resolveSubmissionValue;
  return obj;
}, {});

const IsHeaderSymbol = Symbol("IsHeaderSymbol");

const styles = {
    disabledButton: {
        backgroundColor: 'gray',
    },
};

class FormPage extends Component {
  constructor(props) {
    super(props);
    let form;
    if (offline === "online") {
      form = match;
    } else if (offline === "offlinePit") {
      form = pit;
    } else if (offline === "offline") {
      form = match;
    }
    this.handleFieldChange = (i, new_value) => {
      const inputs = this.state.inputs.concat();
      inputs[i] = new_value;
      this.setState({
        inputs: inputs,
        exitWithoutSaving: true,
      });
    };
    this.state = {
      inputs: form.items.map(() => undefined),
      inputChangeHandlers: form.items.map((item, i) =>
        this.handleFieldChange.bind(this, i)
      ),
      exitWithoutSaving: false,
      loading: true,
      open: false,
    };
    this.getSubmitData = () => {
      return form.items
        .map((item, i) => {
          if (item.type === "header") return IsHeaderSymbol;
          const Field = FieldTypes[item.type];

          if (!Field) {
            return null;
          } else {
            if (Field.resolveSubmissionValue) {
              return Field.resolveSubmissionValue(item, this.state.inputs[i]);
            } else {
              return this.state.inputs[i];
            }
          }
        })
        .filter((x) => x !== IsHeaderSymbol);
    };

    this.handleSubmit = () => {
      if (offline === "offline") {
        console.log(this.getSubmitData());
        var myData = this.getSubmitData();
        console.log(myData[0]);
        offlineSubmit(myData);
      } else if (offline === "online") {
        this.state.loading = true;
        const myData = this.getSubmitData();
        onlineSubmit(myData);
      } else if (offline === "offlinePit") {
        const myData = this.getSubmitData();
        offlinePit(myData);
      } else {
        window.location.replace("/");
      }
    };
  }

  componentDidMount() {
    window.ExitWithoutSave = () => this.state.exitWithoutSaving;
  }

  componentWillUnmount() {
    window.ExitWithoutSave = null;
  }

  render() {
    let form;
    if (offline === "online") {
      form = match;
    } else if (offline === "offlinePit") {
      form = pit;
    } else {
      form = match;
    }
    const handleClickOpen = () => {
      this.setState({ open: true });
    };

    const handleClose = () => {
      this.setState({ open: false });
    };

    const { classes } = this.props;

    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
          style={{ marginTop: "25px", marginBottom: "25px" }}
        >
          Go Home
        </Button>
        <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Exit Without Saving"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Exit this form without saving
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => window.location.replace("/")}
              color="primary"
            >
              Yes
            </Button>
            <Button
              onClick={() => this.setState({ open: false })}
              color="primary"
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>

        <Paper variant="outlined">
          <img
            style={{ width: "100%", height: "100%" }}
            alt=""
            src={fieldImg}
          />
        </Paper>

        <Typography variant="h5" color="inherit" style={{ paddingTop: "25px" }}>
          {form.name}
        </Typography>

        {form.items.map((item, i) => {
          const Field = FieldTypes[item.type];
          if (!Field) {
            return (
              <div key={i}>
                <h4 style={{ color: "red" }}>
                  Uh Oh - Field Type{" "}
                  <span style={{ fontFamily: "monospace" }}>{item.type}</span>{" "}
                  does not exist or is in development.
                </h4>
              </div>
            );
          } else {
            return (
              <Field
                onChange={this.state.inputChangeHandlers[i]}
                value={this.state.inputs[i]}
                config={item}
                key={i}
              />
            );
          }
        })}

        <br />
        <br />

        <Button
          variant="contained"
          disabled={this.getSubmitData().some((x) => x === undefined)}
          onClick={this.handleSubmit}
          style={{ marginBottom: "25px" }}
          classes={{ disabled: classes.disabledButton }}
        >
          Submit
        </Button>
        {this.state.loading ? (
          <div />
        ) : (
          <CircularProgress style={{ marginBottom: "25px" }} />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default withStyles(styles)(FormPage);
