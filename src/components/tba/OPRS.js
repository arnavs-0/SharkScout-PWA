import { ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";

const CustomWrap = styled("div")({
  width: "100%",
  maxWidth: 360,
  backgroundColor: "white",
});

export default function OPRS(props) {
  return (
    <CustomWrap>
      <ListItem>
        <ListItemText primary={props.primary} secondary={props.secondary} />
      </ListItem>
    </CustomWrap>
  );
}
