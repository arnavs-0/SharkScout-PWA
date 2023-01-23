import React from "react";
import { styled } from "@mui/styles";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import WifiIcon from "@mui/icons-material/Wifi";
import { ListItemButton } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: "100%",
//         maxWidth: 360,
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

const CustomList = styled(List)({
  width: "100%",
  maxWidth: 360,
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});

export default function FormSelection(props) {
  return (
    <CustomList sx={{ textAlign: "center" }}>
      <ListItemButton onClick={props.onClick} divider={props.divider}>
        <ListItemAvatar>
          <Avatar>{props.online ? <WifiIcon /> : <WifiOffIcon />}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.main} secondary={props.second} />
      </ListItemButton>
    </CustomList>
  );
}
