import React, { Component } from "react";

import Button from "@mui/material/Button";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box } from "@mui/material";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      intervalId: null,
    };

    this.handleStart = () => {
      if (this.state.intervalId === null) {
        const intervalId = setInterval(() => {
          this.setState((prevState) => ({
            time: prevState.time + 10,
          }));
        }, 10);
        this.setState({ intervalId });
      }
    };

    this.handleStop = () => {
      if (this.state.intervalId !== null) {
        clearInterval(this.state.intervalId);
        this.setState({ intervalId: null });
      }
    };

    this.handleReset = () => {
      this.handleStop();
      this.setState({ time: 0 });
    };
  }

  render() {
    const config = this.props.config;
    const { time } = this.state;
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    const formattedTime = `${seconds}:${
      milliseconds < 10 ? "0" : ""
    }${milliseconds}`;

    return (
      <div
        style={{
          paddingTop: "0.5em",
          marginTop: "15px",
          marginBottom: "15px",
        }}
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
              onClick={this.handleStop}
            >
              <CancelOutlinedIcon />
            </Button>
          </span>
          <span style={{ margin: "0.5em", fontWeight: "bold" }}>
            {formattedTime}
          </span>
          <span style={{ margin: "0.5em" }}>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              onClick={this.handleStart}
            >
              <PlayCircleFilledWhiteOutlinedIcon />
            </Button>
          </span>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            onClick={this.handleReset}
          >
            <RestartAltOutlinedIcon />
          </Button>
        </Box>
      </div>
    );
  }
}

export const id = "timer";

export function resolveSubmissionValue(config, value) {
  if (value !== undefined) return value;
  if (config.default) return config.default;
  return 0;
}
