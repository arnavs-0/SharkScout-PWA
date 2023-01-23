import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { withStyles } from "@mui/styles";
import { blue } from "@mui/material/colors";
import { FormGroup } from "@mui/material";
// TODO: Add flexible multiple checkbox for Schema
const BlueCheckbox = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default class CheckboxSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      launchpad: false,
      tarmac: false,
      outside: false,
      fender: false,
    };

    this.handleChange = (event) => {
      this.setState(
        (state) => ({ [event.target.name]: event.target.checked }),
        () => this.props.onChange(this.state)
      );
    };
  }

  render() {
    return (
      <div
        style={{
          paddingTop: "25px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <BlueCheckbox
                checked={this.state.fender}
                onChange={this.handleChange}
                name="fender"
              />
            }
            label="Fender"
          />
          <FormControlLabel
            control={
              <BlueCheckbox
                checked={this.state.tarmac}
                onChange={this.handleChange}
                name="tarmac"
              />
            }
            label="Tarmac Zone"
          />
          <FormControlLabel
            control={
              <BlueCheckbox
                checked={this.state.outside}
                onChange={this.handleChange}
                name="outside"
              />
            }
            label="Outside Tarmac"
          />
          <FormControlLabel
            control={
              <BlueCheckbox
                checked={this.state.launchpad}
                onChange={this.handleChange}
                name="launchpad"
              />
            }
            label="Launchpad"
          />
        </FormGroup>
      </div>
    );
  }
}

export const id = "checkbox";

export function resolveSubmissionValue(config, value) {
  return value || config.default || false;
}
