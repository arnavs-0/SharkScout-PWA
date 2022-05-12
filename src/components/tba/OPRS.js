import {ListItem, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function OPRS(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ListItem>
                <ListItemText primary={props.primary} secondary={props.secondary}/>
            </ListItem>
        </div>
    );
}
