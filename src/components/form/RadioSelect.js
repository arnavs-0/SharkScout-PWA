import React, {Component} from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {withStyles} from "@material-ui/core/styles";
import {lightBlue} from "@material-ui/core/colors";

const BlueRadio = withStyles({
    root: {
        color: lightBlue[600],
        "&$checked": {
            color: lightBlue[800],
        },
    },
    checked: {},
})((props) => <Radio color="primary" {...props} />);

export default class RadioSelect extends Component {
    constructor(props) {
        super(props);

        this.handleChange = (event) => {
            this.props.onChange(event.target.value);
        };
    }

    render() {
        const config = this.props.config;
        const value = this.props.value || config.options[config.default] || "null";

        return (
            <div style={{paddingTop: "25px"}}>
                <FormControl>
                    <FormLabel style={{color: "black", fontWeight: "bold", marginBottom: "10px"}}>
                    {config.label}
                    </FormLabel>
                    <RadioGroup value={value} onChange={this.handleChange}>
                        {this.props.config.options.map((option, i) => {
                            return (
                                <FormControlLabel
                                    key={i}
                                    value={option}
                                    control={<BlueRadio/>}
                                    label={option}
                                />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

export const id = "radio";

export function resolveSubmissionValue(config, value) {
    if (!("default" in config) && value === undefined) return undefined;
    if (value !== undefined) return value;
    return config.options[config.default];
}
