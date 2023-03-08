import React, { Component } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export default class Dropdown extends Component {
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
          <TextField
            select
            style={{ minWidth: "200px" }}
            label={config.label}
            value={value}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            helperText={config.helperText}
          >
            {this.props.config.options.map((option, i) => {
              return (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </TextField>
        </FormControl>
      </div>
    );
  }
}

export const id = "dropdown";

export function resolveSubmissionValue(config, value) {
  if (!("default" in config) && value === undefined) return undefined;
  if (value !== undefined) return value;
  return config.options[config.default];
}
