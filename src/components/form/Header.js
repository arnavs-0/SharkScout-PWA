import React, { Component } from "react";
import Typography from "@mui/material/Typography";

export default class Header extends Component {
  render() {
    const config = this.props.config;

    return (
      <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
        <Typography variant={config.variant} color="inherit">
          {config.label}
        </Typography>

        {config.description && (
          <div style={{ paddingTop: "5px", opacity: "0.7" }}>
            {config.description}
          </div>
        )}
      </div>
    );
  }
}

export const id = "header";
