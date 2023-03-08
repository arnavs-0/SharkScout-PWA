import React, { Component } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { withStyles } from "@mui/styles";
import { lightBlue } from "@mui/material/colors";

const BlueRadio = withStyles({
  root: {
    color: lightBlue[600],
    "&$checked": {
      color: lightBlue[800],
    },
  },
  checked: {},
})((props) => <Radio color="primary" {...props} />);

export default class RadioSelect extends Component {
  constructor(props) {
    super(props);

    this.handleChange = (event) => {
      this.props.onChange(event.target.value);
    };
  }

  render() {
    const config = this.props.config;
    const value = this.props.value || config.options[config.default] || "null";

    return (
      <div style={{ paddingTop: "25px" }}>
        <FormControl>
          <FormLabel
            color="neutral"
            style={{ fontWeight: "bold", marginBottom: "10px" }}
            focused={false}
          >
            {config.label}
          </FormLabel>
          <RadioGroup value={value} onChange={this.handleChange}>
            {this.props.config.options.map((option, i) => {
              return (
                <FormControlLabel
                  key={i}
                  value={option}
                  control={<BlueRadio />}
                  label={option}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export const id = "radio";

export function resolveSubmissionValue(config, value) {
  if (!("default" in config) && value === undefined) return undefined;
  if (value !== undefined) return value;
  return config.options[config.default];
}
