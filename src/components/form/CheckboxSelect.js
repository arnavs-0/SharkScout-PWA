import React, {Component} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {withStyles} from "@material-ui/core/styles";
import {blue} from "@material-ui/core/colors";
import {FormGroup} from "@material-ui/core";
// TODO: Add flexible multiple checkbox for Schema
const BlueCheckbox = withStyles({
    root: {
        color: blue[400],
        "&$checked": {
            color: blue[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default class CheckboxSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            launchpad: false,
            tarmac: false,
            outside: false,
            fender:false
        }



        this.handleChange = (event) => {
            this.setState((state) => ({[event.target.name]: event.target.checked}), () => this.props.onChange(this.state))
        };
    }

    render() {

        return (
            <div style={{paddingTop: "25px", alignItems: "center", justifyContent: "center"}}>
                <FormGroup>
                <FormControlLabel
                    control={
                        <BlueCheckbox checked={this.state.fender} onChange={this.handleChange} name="fender"/>
                    }
                    label="Fender"
                />
                    <FormControlLabel
                        control={
                            <BlueCheckbox checked={this.state.tarmac} onChange={this.handleChange} name="tarmac"/>
                        }
                        label="Tarmac Zone"
                    />
                    <FormControlLabel
                        control={
                            <BlueCheckbox checked={this.state.outside} onChange={this.handleChange} name="outside"/>
                        }
                        label="Outside Tarmac"
                    />
                    <FormControlLabel
                        control={
                            <BlueCheckbox checked={this.state.launchpad} onChange={this.handleChange} name="launchpad"/>
                        }
                        label="Launchpad"
                    />
                </FormGroup>

            </div>
        );
    }
}

export const id = "checkbox";

export function resolveSubmissionValue(config, value) {
    return value || config.default || false;
}
