import React, { Component } from "react";

import TextField from "@mui/material/TextField";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  root: {
    minHeight: "6em",
  },
});

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.handleChange = (ev) => {
      this.props.onChange(ev.target.value);
    };
  }

  render() {
    const value = this.props.value || "";
    const config = this.props.config;
    const classes = this.props.classes;

    return (
      <div style={{ paddingTop: "0.5em" }}>
        <TextField
          fullWidth
          InputProps={{
            classes,
          }}
          inputProps={{
            className: classes.root,
          }}
          label={config.label}
          value={value}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          multiline={true}
          helperText={config.helperText}
        />
      </div>
    );
  }
}

export const id = "text-area";

export function resolveSubmissionValue(config, value) {
  return value || "";
}

export default withStyles(styles)(TextArea);
