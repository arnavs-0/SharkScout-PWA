import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const styles = () => ({
    toggleContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        height: "3em",
        padding: "0 1.5em",
        color: "black",
        transition: "all 100ms linear",
    },
    button_selected_true: {
        background: "var(--true)!important",
        color: "white!important",
    },
    button_selected_false: {
        background: "var(--false)!important",
        color: "white!important",
    },
});

const default_true_color = "#00801a";
const default_false_color = "#FF0000";

class Boolean extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (event, value) => {
            if (value === null) return;
            this.props.onChange(value);
        };
    }

    render() {
        const {classes, config} = this.props;
        const value = this.props.value || String(config.default) || "null";
        const btnClassesTrue = {
            root: classes.button,
            selected: classes.button_selected_true,
        };
        const btnClassesFalse = {
            root: classes.button,
            selected: classes.button_selected_false,
        };

        return (
            <div style={{paddingTop: "0.5em"}}>
                <p style={{fontWeight: "bold"}}>{config.label}</p>
                <div
                    className={classes.toggleContainer}
                    style={{
                        "--true": config.trueColor || default_true_color,
                        "--false": config.falseColor || default_false_color,
                    }}
                >
                    <ToggleButtonGroup
                        value={value}
                        exclusive
                        display="block !important"
                        onChange={this.handleChange}
                    >
                        <ToggleButton classes={btnClassesTrue} value="true">
                            {config.trueValue || "Yes"}
                        </ToggleButton>
                        <ToggleButton classes={btnClassesFalse} value="false">
                            {config.falseValue || "No"}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        );
    }
}

export const id = "boolean";

export function resolveSubmissionValue(config, value) {
    if (!("default" in config) && value === undefined) return undefined;
    if (value !== undefined)
        return value === "true"
            ? config.trueValue || "Yes"
            : config.falseValue || "No";
    return config.default ? config.trueValue || "Yes" : config.falseValue || "No";
}

export default withStyles(styles)(Boolean);
