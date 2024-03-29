import { Typography } from "@mui/material";
import React, { Component } from "react";

export default class Text extends Component {
  constructor(props) {
    super(props);
    this.handleChange = (event) => {
      this.props.onChange(event.target.value);
    };
  }

  render() {
    console.log(this.props);
    const config = this.props.config;
    return (
      <div style={{ paddingTop: "0.5em", marginBottom: "-10px" }}>
        <Typography variant="p" style={{ fontWeight: "bold" }}>
          {config.label}
        </Typography>
      </div>
    );
  }
}

export const id = "label";

export function resolveSubmissionValue(config, value) {
  return value || "";
}
