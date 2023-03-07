import React, { Component } from "react";
import QRCode from "qrcode.react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import logo from "../modules/assets/img/hammerhead.jpg";
import { qrcode, removeItem } from "../modules/LocalDB";
import { goToHome } from "../modules/Router";

class Qrcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      image: logo,
      imageH: 100,
      imageW: 100,
    };
  }

  render() {
    function handleData() {
      if (qrcode === undefined || qrcode === null) {
        goToHome();
      }
      return qrcode;
    }

    function handleClick() {
      removeItem("qrcode");
      goToHome();
    }

    function handleClickDownload() {
      const fileName = "file";
      const json = qrcode;
      const blob = new Blob([json], { type: "application/json" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = fileName + ".json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    const handleClickOpen = () => {
      this.setState({ open: true });
    };

    const handleClose = () => {
      this.setState({ open: false });
    };
    return (
      <div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginTop: "50px",
          }}
        >
          <QRCode
            size={300}
            imageSettings={{
              src: this.state.image,
            }}
            value={handleData()}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "15px" }}
          onClick={handleClickDownload}
          >
            Download
          </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "15px" }}
          onClick={handleClickOpen}
        >
          Go Home
        </Button>
        <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Go Home?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to go home?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClick} color="primary">
              Yes
            </Button>
            <Button
              onClick={() => this.setState({ open: false })}
              color="primary"
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Qrcode;
