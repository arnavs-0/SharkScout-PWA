import { Paper } from "@mui/material";
import React, { Component } from "react";

export default class Image extends Component {
  render() {
    const config = this.props.config;
    let image = require("../../modules/assets/img/" + config.imageName);
    return (
      <div>
        <Paper variant={config.variant}>
          <img
            style={{ width: config.width, height: config.height }}
            alt=""
            src={image.default}
          />
        </Paper>
        <br />
      </div>
    );
  }
}

export const id = "image";
