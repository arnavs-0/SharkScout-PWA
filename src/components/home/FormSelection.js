import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import WifiOffIcon from "@material-ui/icons/WifiOff";
import WifiIcon from "@material-ui/icons/Wifi";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function FormSelection(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem button onClick={props.onClick} divider={props.divider}>
                <ListItemAvatar>
                    <Avatar>{props.online ? <WifiIcon/> : <WifiOffIcon/>}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.main} secondary={props.second}/>
            </ListItem>
        </List>
    );
}
