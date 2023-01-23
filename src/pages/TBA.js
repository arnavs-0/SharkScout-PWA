import React, { Component } from "react";
import NavBar from "../components/Navbar";
import { Container } from "@mui/material";
import Search from "../components/tba/Search";

class Tba extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Search />
        </Container>
      </div>
    );
  }
}

export default Tba;
