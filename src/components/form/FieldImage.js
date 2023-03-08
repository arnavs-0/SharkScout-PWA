import { Paper } from "@mui/material";
import React, { Component } from "react";
import fieldImg from "../../modules/assets/img/field.png";

export default class FieldImage extends Component {
  render() {
    return (
      <div style={{ paddingTop: "25px", paddingBottom: "5px" }}>
        <Paper
         variant="outlined">
          <img
            style={{ width: "100%", height: "100%", objectFit: "contain"}}
            alt=""
            src={fieldImg}
          />
        </Paper>
      </div>
    );
  }
}

export const id = "img";