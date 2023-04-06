import React, { Component } from "react";
import QRCode from "qrcode.react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
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

    // function handleNotes() {
    //   if (notesqrcode === undefined || notesqrcode === null) {
    //     goToHome();
    //   }
    //   return notesqrcode;
    // }

    function handleClick() {
      removeItem("qrcode");
      removeItem("notesqrcode");
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

      // const fileName2 = "notes";
      // const json2 = notesqrcode;
      // const blob2 = new Blob([json2], { type: "application/json" });
      // const href2 = URL.createObjectURL(blob2);
      // const link2 = document.createElement("a");
      // link2.href = href2;
      // link2.download = fileName2 + ".json";
      // document.body.appendChild(link2);
      // link2.click();
      // document.body.removeChild(link2);

    }

    const handleClickOpen = () => {
      this.setState({ open: true });
    };

    const handleClose = () => {
      this.setState({ open: false });
    };
    return (
      <div>
        <Typography variant="h5" style={{ margin: "15px" }}>
            Match Scouting QR Code
          </Typography>
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
        {/* <Typography variant="h5" style={{ margin: "15px" }}>
          Notes QR Code
        </Typography>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginTop: "200px",
          }}
        >
          <QRCode
            size={300}
            imageSettings={{
              src: this.state.image,
            }}
            value={handleNotes()}
          />
        </div> */}
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
