// /* eslint-disable no-use-before-define */
import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { teams } from "../../modules/assets/teams";
// TODO: Add flexible multiple autocomplete for Schema
const filter = createFilterOptions();
export default class Completion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      open: false,
      dialogValue: {
        team: "",
        match: "",
        alliance: "",
      },
    };

    this.handleClose = () => {
      this.setState(() => {
        return {
          open: false,
          dialogValue: { team: "", match: "", alliance: "" },
        };
      });
    };

    this.handleSubmit = (event, newValue) => {
      event.preventDefault();
      this.setState(
        (state) => ({
          value: {
            team: state.dialogValue.team,
            match: parseInt(state.dialogValue.match, 10),
            alliance: state.dialogValue.alliance,
          },
        }),
        () => this.props.onChange(this.state)
      );
      // this.handleChange(event, {team: this.state.dialogValue.team, match: parseInt(this.state.dialogValue.match, 10), alliance: this.state.dialogValue.alliance})

      this.handleClose();
    };
    this.handleChange = (event, newValue) => {
      this.props.onChange(newValue);
    };

    this.handleRender = (option) => {
      if (option.match !== undefined) {
        return (
          "Q" +
          option.match.toString() +
          " " +
          option.team +
          " " +
          option.alliance
        );
      }
      return option.team;
    };

    this.handleOption = (option) => {
      if (option.match !== undefined) {
        return (
          "Q" +
          option.match.toString() +
          " " +
          option.team +
          " " +
          option.alliance
        );
      }
      return option.team;
    };
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ display: "flex", paddingTop: "0.5em", alignItems: "center", justifyContent: "center" }}>
        <Container>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs>
            <Autocomplete
              value={this.state.value}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  // timeout to avoid instant validation of the dialog's form.
                  setTimeout(() => {
                    this.setState(() => {
                      return {
                        open: true,
                        dialogValue: {
                          team: "",
                          match: "",
                          alliance: "",
                        },
                      };
                    });
                  });
                } else if (newValue && newValue.inputValue) {
                  this.setState(() => {
                    return {
                      open: true,
                      dialogValue: {
                        team: "",
                        match: "",
                        alliance: "",
                      },
                    };
                  });
                } else {
                  this.props.onChange(newValue);
                  this.setState(() => {
                    return {
                      value: newValue,
                    };
                  });
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: `Add new match`,
                    team: `Add new match`,
                  });
                }

                return filtered;
              }}
              id="free-solo-dialog-demo"
              options={JSON.parse(localStorage.getItem("matches"))}
              getOptionLabel={(option) => {
                if (option.match !== undefined) {
                  return (
                    "Q" +
                    option.match.toString() +
                    " " +
                    option.team +
                    " " +
                    option.alliance
                  );
                }
                return option.team;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => (
                <li {...props}>
                  {" "}
                  {option.match !== undefined ? "Q" : ""}
                  {option.match} {option.alliance} {option.team}
                </li>
              )}
              sx={{ width: 300, display: 'inline-block', margin: '0 auto' }}
              freeSolo
              center
              renderInput={(params) => (
                <Grid item xs>
                <TextField
                  {...params}
                  margin="normal"
                  label="Setup"
                  helperText="Type in match number ex. Q1"
                />
                </Grid>
              )}
            />
            </Grid>
            </Grid>
          </Container>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <form onSubmit={this.handleSubmit}>
              <DialogTitle id="form-dialog-title">Add a new team</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Only use this if autocomplete does not work or match is being
                  replayed.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={this.state.dialogValue.team}
                  onChange={(event) =>
                    this.setState((state) => {
                      return {
                        dialogValue: {
                          ...state.dialogValue,
                          team: event.target.value,
                        },
                      };
                    })
                  }
                  label="Team"
                  type="text"
                  variant="outlined"
                />
                <TextField
                  margin="dense"
                  id="name"
                  value={this.state.dialogValue.match}
                  onChange={(event) =>
                    this.setState((state) => {
                      return {
                        dialogValue: {
                          ...state.dialogValue,
                          match: event.target.value,
                        },
                      };
                    })
                  }
                  label="Match"
                  type="number"
                  variant="outlined"
                />
                <FormControl>
                  <FormLabel>Alliance</FormLabel>
                  <RadioGroup
                    row
                    value={this.state.dialogValue.alliance}
                    onChange={(event) =>
                      this.setState((state) => {
                        return {
                          dialogValue: {
                            ...state.dialogValue,
                            alliance: event.target.value,
                          },
                        };
                      })
                    }
                  >
                    <FormControlLabel
                      control={<Radio />}
                      label="B1"
                      value="B1"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="B2"
                      value="B2"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="B3"
                      value="B3"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="R1"
                      value="R1"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="R2"
                      value="R2"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="R3"
                      value="R3"
                    />
                  </RadioGroup>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Add
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
        
      </React.Fragment>
    );
  }
}

export const id = "comp";

export function resolveSubmissionValue(config, value) {
  return value;
}