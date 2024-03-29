import React, { Component } from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SubtractIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/material";

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.resolveValue = () => {
      if (this.props.value !== undefined) {
        return this.props.value;
      } else if ("default" in this.props.config) {
        return this.props.config.default;
      } else {
        return 0;
      }
    };
    const step = this.props.config.step || 1;

    this.handleDecrease = () => {
      const value = this.resolveValue();
      this.props.onChange(value - step);
    };
    this.handleIncrease = () => {
      const value = this.resolveValue();
      this.props.onChange(value + step);
    };
  }

  render() {
    const value = this.resolveValue();
    const config = this.props.config;
    let min = "min" in config ? config.min : 0;
    if (min === null) min = undefined;
    let max = config.max || undefined;

    return (
      <div
        // style={{
        //   paddingTop: "0.5em",
        //   marginTop: "5px",
        //   marginBottom: "5px",
        // }}
      >
        <p>
          <strong>{config.label}</strong>
        </p>
        <br />
        <Box display="flex" alignItems="center" justifyContent="center">
          <span style={{ margin: "0.5em" }}>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              onClick={this.handleDecrease}
              disabled={value <= min}
            >
              <SubtractIcon />
            </Button>
          </span>
          <span style={{ margin: "0.5em", fontWeight: "bold" }}>{value}</span>
          <span style={{ margin: "0.5em" }}>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              onClick={this.handleIncrease}
              disabled={value >= max}
            >
              <AddIcon />
            </Button>
          </span>
        </Box>
      </div>
    );
  }
}

export const id = "counter";

export function resolveSubmissionValue(config, value) {
  if (value !== undefined) return value;
  if (config.default) return config.default;
  return 0;
}
