// /* eslint-disable no-use-before-define */
import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
// TODO: Add flexible multiple autocomplete for Schema
 const filter = createFilterOptions();
export default class Completion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: null,
            open: false,
            dialogValue: {
                team: '',
                match: '',
                alliance: ''
            }
        }

        this.handleClose = () => {
            this.setState(() => { return {open: false, dialogValue: {team: '', match: '', alliance: ''}}});
        };

        this.handleSubmit = (event, newValue) => {
            event.preventDefault();
            this.setState((state) => ({
                value: {
                    team: state.dialogValue.team,
                    match: parseInt(state.dialogValue.match, 10),
                    alliance: state.dialogValue.alliance
                }
            }), () => this.props.onChange(this.state))
            // this.handleChange(event, {team: this.state.dialogValue.team, match: parseInt(this.state.dialogValue.match, 10), alliance: this.state.dialogValue.alliance})

            this.handleClose();

        }
        this.handleChange = (event, newValue) => {
            this.props.onChange(newValue);
        };

        this.handleRender = (option) => {
            if (option.match !== undefined) {
                return "Q" + option.match + " " + option.team + " " + option.alliance
            }
            return option.team
        }

        this.handleOption = (option) => {
            if (option.match !== undefined){
                return "Q" + option.match.toString() + " " + option.team + " " + option.alliance;
            }
            return option.team
        }
    }

    render() {
        return (
        <React.Fragment style={{paddingTop: "0.5em"}}>
            <Autocomplete
                value={this.state.value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            this.setState(() => { return {open: true, dialogValue: {
                                    team: '',
                                    match: '',
                                    alliance: '',
                                }}});

                        });
                    } else if (newValue && newValue.inputValue) {
                        this.setState(() => {
                            return {
                                open: true,
                                dialogValue: {
                                    team: '',
                                    match: '',
                                    alliance: '',
                                }
                            }
                        })
                    } else {
                        this.props.onChange(newValue)
                        this.setState(() => {
                            return {
                                value: newValue
                            }
                        })
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: "Add New Team",
                            team: `Add New Team`,
                        });
                    }
                    return filtered;
                }}
                id="free-solo-dialog-demo"
                options={teams}
                getOptionLabel={this.handleOption}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={this.handleRender}
                style={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label="Setup" helperText="Type in match number ex. Q1" variant="outlined" />
                )}
            />
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={this.handleSubmit}>
                    <DialogTitle id="form-dialog-title">Add a new team</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Only use this if autocomplete does not work or match is being replayed.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={this.state.dialogValue.team}
                            onChange={(event) =>
                                this.setState((state) => {
                                    return {
                                        dialogValue: ({...state.dialogValue, team: event.target.value})
                                    }
                                })}
                            label="Team"
                            type="text"
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            value={this.state.dialogValue.match}
                            onChange={(event) =>
                                this.setState((state) => {
                                    return {
                                        dialogValue: ({...state.dialogValue, match: event.target.value})
                                    }
                                })}
                            label="Match"
                            type="number"
                            variant="outlined"
                        />
                        <FormControl>
                            <FormLabel>Alliance</FormLabel>
                            <RadioGroup
                                row
                                value={this.state.dialogValue.alliance}
                                onChange={(event) =>
                                    this.setState((state) => {
                                        return {
                                            dialogValue: ({...state.dialogValue, alliance: event.target.value})
                                        }
                                    })}
                                >
                                <FormControlLabel control={<Radio/>} label="B1" value="B1"/>
                                <FormControlLabel control={<Radio/>} label="B2" value="B2"/>
                                <FormControlLabel control={<Radio/>} label="B3" value="B3"/>
                                <FormControlLabel control={<Radio/>} label="R1" value="R1"/>
                                <FormControlLabel control={<Radio/>} label="R2" value="R2"/>
                                <FormControlLabel control={<Radio/>} label="R3" value="R3"/>
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
        );
    }
}

export const id = "autocomplete"

//Import from TBA Manually - TODO - make this use raw data from TBA and JSON file
const teams = [
    {
        "match": 1,
        "alliance": "R1",
        "team": "2767"
    },
    {
        "match": 1,
        "alliance": "R2",
        "team": "5612"
    },
    {
        "match": 1,
        "alliance": "R3",
        "team": "1918"
    },
    {
        "match": 1,
        "alliance": "B1",
        "team": "4776"
    },
    {
        "match": 1,
        "alliance": "B2",
        "team": "4381"
    },
    {
        "match": 1,
        "alliance": "B3",
        "team": "70"
    },
    {
        "match": 10,
        "alliance": "R1",
        "team": "2960"
    },
    {
        "match": 10,
        "alliance": "R2",
        "team": "3688"
    },
    {
        "match": 10,
        "alliance": "R3",
        "team": "6090"
    },
    {
        "match": 10,
        "alliance": "B1",
        "team": "8873"
    },
    {
        "match": 10,
        "alliance": "B2",
        "team": "6078"
    },
    {
        "match": 10,
        "alliance": "B3",
        "team": "7660"
    },
    {
        "match": 11,
        "alliance": "R1",
        "team": "5498"
    },
    {
        "match": 11,
        "alliance": "R2",
        "team": "6087"
    },
    {
        "match": 11,
        "alliance": "R3",
        "team": "5577"
    },
    {
        "match": 11,
        "alliance": "B1",
        "team": "70"
    },
    {
        "match": 11,
        "alliance": "B2",
        "team": "6122"
    },
    {
        "match": 11,
        "alliance": "B3",
        "team": "2832"
    },
    {
        "match": 12,
        "alliance": "R1",
        "team": "8425"
    },
    {
        "match": 12,
        "alliance": "R2",
        "team": "6569"
    },
    {
        "match": 12,
        "alliance": "R3",
        "team": "1918"
    },
    {
        "match": 12,
        "alliance": "B1",
        "team": "5612"
    },
    {
        "match": 12,
        "alliance": "B2",
        "team": "226"
    },
    {
        "match": 12,
        "alliance": "B3",
        "team": "107"
    },
    {
        "match": 13,
        "alliance": "R1",
        "team": "3536"
    },
    {
        "match": 13,
        "alliance": "R2",
        "team": "5675"
    },
    {
        "match": 13,
        "alliance": "R3",
        "team": "1023"
    },
    {
        "match": 13,
        "alliance": "B1",
        "team": "5509"
    },
    {
        "match": 13,
        "alliance": "B2",
        "team": "3602"
    },
    {
        "match": 13,
        "alliance": "B3",
        "team": "2767"
    },
    {
        "match": 14,
        "alliance": "R1",
        "team": "6078"
    },
    {
        "match": 14,
        "alliance": "R2",
        "team": "7769"
    },
    {
        "match": 14,
        "alliance": "R3",
        "team": "4381"
    },
    {
        "match": 14,
        "alliance": "B1",
        "team": "5538"
    },
    {
        "match": 14,
        "alliance": "B2",
        "team": "51"
    },
    {
        "match": 14,
        "alliance": "B3",
        "team": "4776"
    },
    {
        "match": 15,
        "alliance": "R1",
        "team": "5498"
    },
    {
        "match": 15,
        "alliance": "R2",
        "team": "503"
    },
    {
        "match": 15,
        "alliance": "R3",
        "team": "6861"
    },
    {
        "match": 15,
        "alliance": "B1",
        "team": "7660"
    },
    {
        "match": 15,
        "alliance": "B2",
        "team": "6087"
    },
    {
        "match": 15,
        "alliance": "B3",
        "team": "2960"
    },
    {
        "match": 16,
        "alliance": "R1",
        "team": "894"
    },
    {
        "match": 16,
        "alliance": "R2",
        "team": "1918"
    },
    {
        "match": 16,
        "alliance": "R3",
        "team": "3603"
    },
    {
        "match": 16,
        "alliance": "B1",
        "team": "302"
    },
    {
        "match": 16,
        "alliance": "B2",
        "team": "8425"
    },
    {
        "match": 16,
        "alliance": "B3",
        "team": "8873"
    },
    {
        "match": 17,
        "alliance": "R1",
        "team": "5612"
    },
    {
        "match": 17,
        "alliance": "R2",
        "team": "2832"
    },
    {
        "match": 17,
        "alliance": "R3",
        "team": "6569"
    },
    {
        "match": 17,
        "alliance": "B1",
        "team": "5675"
    },
    {
        "match": 17,
        "alliance": "B2",
        "team": "5535"
    },
    {
        "match": 17,
        "alliance": "B3",
        "team": "3602"
    },
    {
        "match": 18,
        "alliance": "R1",
        "team": "2767"
    },
    {
        "match": 18,
        "alliance": "R2",
        "team": "1506"
    },
    {
        "match": 18,
        "alliance": "R3",
        "team": "226"
    },
    {
        "match": 18,
        "alliance": "B1",
        "team": "5577"
    },
    {
        "match": 18,
        "alliance": "B2",
        "team": "5509"
    },
    {
        "match": 18,
        "alliance": "B3",
        "team": "1023"
    },
    {
        "match": 19,
        "alliance": "R1",
        "team": "858"
    },
    {
        "match": 19,
        "alliance": "R2",
        "team": "107"
    },
    {
        "match": 19,
        "alliance": "R3",
        "team": "6090"
    },
    {
        "match": 19,
        "alliance": "B1",
        "team": "5538"
    },
    {
        "match": 19,
        "alliance": "B2",
        "team": "3175"
    },
    {
        "match": 19,
        "alliance": "B3",
        "team": "3688"
    },
    {
        "match": 2,
        "alliance": "R1",
        "team": "3175"
    },
    {
        "match": 2,
        "alliance": "R2",
        "team": "7660"
    },
    {
        "match": 2,
        "alliance": "R3",
        "team": "5577"
    },
    {
        "match": 2,
        "alliance": "B1",
        "team": "7769"
    },
    {
        "match": 2,
        "alliance": "B2",
        "team": "818"
    },
    {
        "match": 2,
        "alliance": "B3",
        "team": "1506"
    },
    {
        "match": 20,
        "alliance": "R1",
        "team": "6122"
    },
    {
        "match": 20,
        "alliance": "R2",
        "team": "818"
    },
    {
        "match": 20,
        "alliance": "R3",
        "team": "4381"
    },
    {
        "match": 20,
        "alliance": "B1",
        "team": "573"
    },
    {
        "match": 20,
        "alliance": "B2",
        "team": "3536"
    },
    {
        "match": 20,
        "alliance": "B3",
        "team": "70"
    },
    {
        "match": 21,
        "alliance": "R1",
        "team": "2960"
    },
    {
        "match": 21,
        "alliance": "R2",
        "team": "6078"
    },
    {
        "match": 21,
        "alliance": "R3",
        "team": "503"
    },
    {
        "match": 21,
        "alliance": "B1",
        "team": "4776"
    },
    {
        "match": 21,
        "alliance": "B2",
        "team": "3602"
    },
    {
        "match": 21,
        "alliance": "B3",
        "team": "5612"
    },
    {
        "match": 22,
        "alliance": "R1",
        "team": "2832"
    },
    {
        "match": 22,
        "alliance": "R2",
        "team": "8425"
    },
    {
        "match": 22,
        "alliance": "R3",
        "team": "1506"
    },
    {
        "match": 22,
        "alliance": "B1",
        "team": "51"
    },
    {
        "match": 22,
        "alliance": "B2",
        "team": "1918"
    },
    {
        "match": 22,
        "alliance": "B3",
        "team": "6861"
    },
    {
        "match": 23,
        "alliance": "R1",
        "team": "5675"
    },
    {
        "match": 23,
        "alliance": "R2",
        "team": "8873"
    },
    {
        "match": 23,
        "alliance": "R3",
        "team": "2767"
    },
    {
        "match": 23,
        "alliance": "B1",
        "team": "7769"
    },
    {
        "match": 23,
        "alliance": "B2",
        "team": "3175"
    },
    {
        "match": 23,
        "alliance": "B3",
        "team": "226"
    },
    {
        "match": 24,
        "alliance": "R1",
        "team": "70"
    },
    {
        "match": 24,
        "alliance": "R2",
        "team": "818"
    },
    {
        "match": 24,
        "alliance": "R3",
        "team": "5577"
    },
    {
        "match": 24,
        "alliance": "B1",
        "team": "5535"
    },
    {
        "match": 24,
        "alliance": "B2",
        "team": "894"
    },
    {
        "match": 24,
        "alliance": "B3",
        "team": "3688"
    },
    {
        "match": 25,
        "alliance": "R1",
        "team": "858"
    },
    {
        "match": 25,
        "alliance": "R2",
        "team": "5509"
    },
    {
        "match": 25,
        "alliance": "R3",
        "team": "6087"
    },
    {
        "match": 25,
        "alliance": "B1",
        "team": "3603"
    },
    {
        "match": 25,
        "alliance": "B2",
        "team": "5538"
    },
    {
        "match": 25,
        "alliance": "B3",
        "team": "5498"
    },
    {
        "match": 26,
        "alliance": "R1",
        "team": "7660"
    },
    {
        "match": 26,
        "alliance": "R2",
        "team": "1023"
    },
    {
        "match": 26,
        "alliance": "R3",
        "team": "573"
    },
    {
        "match": 26,
        "alliance": "B1",
        "team": "107"
    },
    {
        "match": 26,
        "alliance": "B2",
        "team": "302"
    },
    {
        "match": 26,
        "alliance": "B3",
        "team": "3536"
    },
    {
        "match": 27,
        "alliance": "R1",
        "team": "6122"
    },
    {
        "match": 27,
        "alliance": "R2",
        "team": "6569"
    },
    {
        "match": 27,
        "alliance": "R3",
        "team": "2960"
    },
    {
        "match": 27,
        "alliance": "B1",
        "team": "4381"
    },
    {
        "match": 27,
        "alliance": "B2",
        "team": "6090"
    },
    {
        "match": 27,
        "alliance": "B3",
        "team": "3175"
    },
    {
        "match": 28,
        "alliance": "R1",
        "team": "818"
    },
    {
        "match": 28,
        "alliance": "R2",
        "team": "226"
    },
    {
        "match": 28,
        "alliance": "R3",
        "team": "2832"
    },
    {
        "match": 28,
        "alliance": "B1",
        "team": "1506"
    },
    {
        "match": 28,
        "alliance": "B2",
        "team": "6078"
    },
    {
        "match": 28,
        "alliance": "B3",
        "team": "5612"
    },
    {
        "match": 29,
        "alliance": "R1",
        "team": "2767"
    },
    {
        "match": 29,
        "alliance": "R2",
        "team": "3688"
    },
    {
        "match": 29,
        "alliance": "R3",
        "team": "51"
    },
    {
        "match": 29,
        "alliance": "B1",
        "team": "6087"
    },
    {
        "match": 29,
        "alliance": "B2",
        "team": "5538"
    },
    {
        "match": 29,
        "alliance": "B3",
        "team": "894"
    },
    {
        "match": 3,
        "alliance": "R1",
        "team": "6861"
    },
    {
        "match": 3,
        "alliance": "R2",
        "team": "573"
    },
    {
        "match": 3,
        "alliance": "R3",
        "team": "894"
    },
    {
        "match": 3,
        "alliance": "B1",
        "team": "3603"
    },
    {
        "match": 3,
        "alliance": "B2",
        "team": "5675"
    },
    {
        "match": 3,
        "alliance": "B3",
        "team": "858"
    },
    {
        "match": 30,
        "alliance": "R1",
        "team": "7769"
    },
    {
        "match": 30,
        "alliance": "R2",
        "team": "1023"
    },
    {
        "match": 30,
        "alliance": "R3",
        "team": "5498"
    },
    {
        "match": 30,
        "alliance": "B1",
        "team": "8873"
    },
    {
        "match": 30,
        "alliance": "B2",
        "team": "5535"
    },
    {
        "match": 30,
        "alliance": "B3",
        "team": "573"
    },
    {
        "match": 31,
        "alliance": "R1",
        "team": "6861"
    },
    {
        "match": 31,
        "alliance": "R2",
        "team": "3603"
    },
    {
        "match": 31,
        "alliance": "R3",
        "team": "107"
    },
    {
        "match": 31,
        "alliance": "B1",
        "team": "6090"
    },
    {
        "match": 31,
        "alliance": "B2",
        "team": "70"
    },
    {
        "match": 31,
        "alliance": "B3",
        "team": "3602"
    },
    {
        "match": 32,
        "alliance": "R1",
        "team": "858"
    },
    {
        "match": 32,
        "alliance": "R2",
        "team": "302"
    },
    {
        "match": 32,
        "alliance": "R3",
        "team": "4381"
    },
    {
        "match": 32,
        "alliance": "B1",
        "team": "5509"
    },
    {
        "match": 32,
        "alliance": "B2",
        "team": "8425"
    },
    {
        "match": 32,
        "alliance": "B3",
        "team": "7660"
    },
    {
        "match": 33,
        "alliance": "R1",
        "team": "4776"
    },
    {
        "match": 33,
        "alliance": "R2",
        "team": "503"
    },
    {
        "match": 33,
        "alliance": "R3",
        "team": "3536"
    },
    {
        "match": 33,
        "alliance": "B1",
        "team": "5577"
    },
    {
        "match": 33,
        "alliance": "B2",
        "team": "6569"
    },
    {
        "match": 33,
        "alliance": "B3",
        "team": "5675"
    },
    {
        "match": 34,
        "alliance": "R1",
        "team": "1918"
    },
    {
        "match": 34,
        "alliance": "R2",
        "team": "5535"
    },
    {
        "match": 34,
        "alliance": "R3",
        "team": "2832"
    },
    {
        "match": 34,
        "alliance": "B1",
        "team": "6122"
    },
    {
        "match": 34,
        "alliance": "B2",
        "team": "2767"
    },
    {
        "match": 34,
        "alliance": "B3",
        "team": "6087"
    },
    {
        "match": 35,
        "alliance": "R1",
        "team": "226"
    },
    {
        "match": 35,
        "alliance": "R2",
        "team": "3602"
    },
    {
        "match": 35,
        "alliance": "R3",
        "team": "5538"
    },
    {
        "match": 35,
        "alliance": "B1",
        "team": "894"
    },
    {
        "match": 35,
        "alliance": "B2",
        "team": "1506"
    },
    {
        "match": 35,
        "alliance": "B3",
        "team": "5498"
    },
    {
        "match": 36,
        "alliance": "R1",
        "team": "818"
    },
    {
        "match": 36,
        "alliance": "R2",
        "team": "7660"
    },
    {
        "match": 36,
        "alliance": "R3",
        "team": "302"
    },
    {
        "match": 36,
        "alliance": "B1",
        "team": "5612"
    },
    {
        "match": 36,
        "alliance": "B2",
        "team": "51"
    },
    {
        "match": 36,
        "alliance": "B3",
        "team": "5509"
    },
    {
        "match": 37,
        "alliance": "R1",
        "team": "3688"
    },
    {
        "match": 37,
        "alliance": "R2",
        "team": "858"
    },
    {
        "match": 37,
        "alliance": "R3",
        "team": "573"
    },
    {
        "match": 37,
        "alliance": "B1",
        "team": "503"
    },
    {
        "match": 37,
        "alliance": "B2",
        "team": "107"
    },
    {
        "match": 37,
        "alliance": "B3",
        "team": "6569"
    },
    {
        "match": 38,
        "alliance": "R1",
        "team": "3175"
    },
    {
        "match": 38,
        "alliance": "R2",
        "team": "8873"
    },
    {
        "match": 38,
        "alliance": "R3",
        "team": "6122"
    },
    {
        "match": 38,
        "alliance": "B1",
        "team": "5577"
    },
    {
        "match": 38,
        "alliance": "B2",
        "team": "6861"
    },
    {
        "match": 38,
        "alliance": "B3",
        "team": "4776"
    },
    {
        "match": 39,
        "alliance": "R1",
        "team": "5675"
    },
    {
        "match": 39,
        "alliance": "R2",
        "team": "6090"
    },
    {
        "match": 39,
        "alliance": "R3",
        "team": "7769"
    },
    {
        "match": 39,
        "alliance": "B1",
        "team": "4381"
    },
    {
        "match": 39,
        "alliance": "B2",
        "team": "2960"
    },
    {
        "match": 39,
        "alliance": "B3",
        "team": "8425"
    },
    {
        "match": 4,
        "alliance": "R1",
        "team": "51"
    },
    {
        "match": 4,
        "alliance": "R2",
        "team": "5535"
    },
    {
        "match": 4,
        "alliance": "R3",
        "team": "6122"
    },
    {
        "match": 4,
        "alliance": "B1",
        "team": "8425"
    },
    {
        "match": 4,
        "alliance": "B2",
        "team": "6090"
    },
    {
        "match": 4,
        "alliance": "B3",
        "team": "503"
    },
    {
        "match": 40,
        "alliance": "R1",
        "team": "3603"
    },
    {
        "match": 40,
        "alliance": "R2",
        "team": "70"
    },
    {
        "match": 40,
        "alliance": "R3",
        "team": "1023"
    },
    {
        "match": 40,
        "alliance": "B1",
        "team": "6078"
    },
    {
        "match": 40,
        "alliance": "B2",
        "team": "1918"
    },
    {
        "match": 40,
        "alliance": "B3",
        "team": "3536"
    },
    {
        "match": 41,
        "alliance": "R1",
        "team": "6087"
    },
    {
        "match": 41,
        "alliance": "R2",
        "team": "51"
    },
    {
        "match": 41,
        "alliance": "R3",
        "team": "3602"
    },
    {
        "match": 41,
        "alliance": "B1",
        "team": "6569"
    },
    {
        "match": 41,
        "alliance": "B2",
        "team": "573"
    },
    {
        "match": 41,
        "alliance": "B3",
        "team": "1506"
    },
    {
        "match": 42,
        "alliance": "R1",
        "team": "5498"
    },
    {
        "match": 42,
        "alliance": "R2",
        "team": "107"
    },
    {
        "match": 42,
        "alliance": "R3",
        "team": "4776"
    },
    {
        "match": 42,
        "alliance": "B1",
        "team": "894"
    },
    {
        "match": 42,
        "alliance": "B2",
        "team": "2767"
    },
    {
        "match": 42,
        "alliance": "B3",
        "team": "818"
    },
    {
        "match": 43,
        "alliance": "R1",
        "team": "503"
    },
    {
        "match": 43,
        "alliance": "R2",
        "team": "6122"
    },
    {
        "match": 43,
        "alliance": "R3",
        "team": "302"
    },
    {
        "match": 43,
        "alliance": "B1",
        "team": "2960"
    },
    {
        "match": 43,
        "alliance": "B2",
        "team": "226"
    },
    {
        "match": 43,
        "alliance": "B3",
        "team": "5675"
    },
    {
        "match": 44,
        "alliance": "R1",
        "team": "2832"
    },
    {
        "match": 44,
        "alliance": "R2",
        "team": "7769"
    },
    {
        "match": 44,
        "alliance": "R3",
        "team": "5577"
    },
    {
        "match": 44,
        "alliance": "B1",
        "team": "4381"
    },
    {
        "match": 44,
        "alliance": "B2",
        "team": "7660"
    },
    {
        "match": 44,
        "alliance": "B3",
        "team": "3603"
    },
    {
        "match": 45,
        "alliance": "R1",
        "team": "8873"
    },
    {
        "match": 45,
        "alliance": "R2",
        "team": "5612"
    },
    {
        "match": 45,
        "alliance": "R3",
        "team": "70"
    },
    {
        "match": 45,
        "alliance": "B1",
        "team": "6090"
    },
    {
        "match": 45,
        "alliance": "B2",
        "team": "5538"
    },
    {
        "match": 45,
        "alliance": "B3",
        "team": "6861"
    },
    {
        "match": 46,
        "alliance": "R1",
        "team": "3688"
    },
    {
        "match": 46,
        "alliance": "R2",
        "team": "8425"
    },
    {
        "match": 46,
        "alliance": "R3",
        "team": "6078"
    },
    {
        "match": 46,
        "alliance": "B1",
        "team": "3175"
    },
    {
        "match": 46,
        "alliance": "B2",
        "team": "5509"
    },
    {
        "match": 46,
        "alliance": "B3",
        "team": "3536"
    },
    {
        "match": 47,
        "alliance": "R1",
        "team": "5535"
    },
    {
        "match": 47,
        "alliance": "R2",
        "team": "858"
    },
    {
        "match": 47,
        "alliance": "R3",
        "team": "2960"
    },
    {
        "match": 47,
        "alliance": "B1",
        "team": "1023"
    },
    {
        "match": 47,
        "alliance": "B2",
        "team": "1918"
    },
    {
        "match": 47,
        "alliance": "B3",
        "team": "6122"
    },
    {
        "match": 48,
        "alliance": "R1",
        "team": "5498"
    },
    {
        "match": 48,
        "alliance": "R2",
        "team": "2767"
    },
    {
        "match": 48,
        "alliance": "R3",
        "team": "4381"
    },
    {
        "match": 48,
        "alliance": "B1",
        "team": "503"
    },
    {
        "match": 48,
        "alliance": "B2",
        "team": "1506"
    },
    {
        "match": 48,
        "alliance": "B3",
        "team": "3603"
    },
    {
        "match": 49,
        "alliance": "R1",
        "team": "7660"
    },
    {
        "match": 49,
        "alliance": "R2",
        "team": "226"
    },
    {
        "match": 49,
        "alliance": "R3",
        "team": "4776"
    },
    {
        "match": 49,
        "alliance": "B1",
        "team": "6090"
    },
    {
        "match": 49,
        "alliance": "B2",
        "team": "2832"
    },
    {
        "match": 49,
        "alliance": "B3",
        "team": "573"
    },
    {
        "match": 5,
        "alliance": "R1",
        "team": "302"
    },
    {
        "match": 5,
        "alliance": "R2",
        "team": "2960"
    },
    {
        "match": 5,
        "alliance": "R3",
        "team": "3602"
    },
    {
        "match": 5,
        "alliance": "B1",
        "team": "2832"
    },
    {
        "match": 5,
        "alliance": "B2",
        "team": "5538"
    },
    {
        "match": 5,
        "alliance": "B3",
        "team": "1023"
    },
    {
        "match": 50,
        "alliance": "R1",
        "team": "5577"
    },
    {
        "match": 50,
        "alliance": "R2",
        "team": "894"
    },
    {
        "match": 50,
        "alliance": "R3",
        "team": "8873"
    },
    {
        "match": 50,
        "alliance": "B1",
        "team": "6087"
    },
    {
        "match": 50,
        "alliance": "B2",
        "team": "302"
    },
    {
        "match": 50,
        "alliance": "B3",
        "team": "6569"
    },
    {
        "match": 51,
        "alliance": "R1",
        "team": "70"
    },
    {
        "match": 51,
        "alliance": "R2",
        "team": "6861"
    },
    {
        "match": 51,
        "alliance": "R3",
        "team": "8425"
    },
    {
        "match": 51,
        "alliance": "B1",
        "team": "3536"
    },
    {
        "match": 51,
        "alliance": "B2",
        "team": "7769"
    },
    {
        "match": 51,
        "alliance": "B3",
        "team": "3688"
    },
    {
        "match": 52,
        "alliance": "R1",
        "team": "5538"
    },
    {
        "match": 52,
        "alliance": "R2",
        "team": "6078"
    },
    {
        "match": 52,
        "alliance": "R3",
        "team": "858"
    },
    {
        "match": 52,
        "alliance": "B1",
        "team": "818"
    },
    {
        "match": 52,
        "alliance": "B2",
        "team": "5675"
    },
    {
        "match": 52,
        "alliance": "B3",
        "team": "1918"
    },
    {
        "match": 53,
        "alliance": "R1",
        "team": "107"
    },
    {
        "match": 53,
        "alliance": "R2",
        "team": "3175"
    },
    {
        "match": 53,
        "alliance": "R3",
        "team": "51"
    },
    {
        "match": 53,
        "alliance": "B1",
        "team": "5612"
    },
    {
        "match": 53,
        "alliance": "B2",
        "team": "1023"
    },
    {
        "match": 53,
        "alliance": "B3",
        "team": "5535"
    },
    {
        "match": 54,
        "alliance": "R1",
        "team": "5509"
    },
    {
        "match": 54,
        "alliance": "R2",
        "team": "4381"
    },
    {
        "match": 54,
        "alliance": "R3",
        "team": "8873"
    },
    {
        "match": 54,
        "alliance": "B1",
        "team": "3602"
    },
    {
        "match": 54,
        "alliance": "B2",
        "team": "2832"
    },
    {
        "match": 54,
        "alliance": "B3",
        "team": "503"
    },
    {
        "match": 55,
        "alliance": "R1",
        "team": "1506"
    },
    {
        "match": 55,
        "alliance": "R2",
        "team": "3688"
    },
    {
        "match": 55,
        "alliance": "R3",
        "team": "70"
    },
    {
        "match": 55,
        "alliance": "B1",
        "team": "226"
    },
    {
        "match": 55,
        "alliance": "B2",
        "team": "573"
    },
    {
        "match": 55,
        "alliance": "B3",
        "team": "302"
    },
    {
        "match": 56,
        "alliance": "R1",
        "team": "7660"
    },
    {
        "match": 56,
        "alliance": "R2",
        "team": "2767"
    },
    {
        "match": 56,
        "alliance": "R3",
        "team": "5538"
    },
    {
        "match": 56,
        "alliance": "B1",
        "team": "6078"
    },
    {
        "match": 56,
        "alliance": "B2",
        "team": "3603"
    },
    {
        "match": 56,
        "alliance": "B3",
        "team": "6569"
    },
    {
        "match": 57,
        "alliance": "R1",
        "team": "3536"
    },
    {
        "match": 57,
        "alliance": "R2",
        "team": "6122"
    },
    {
        "match": 57,
        "alliance": "R3",
        "team": "5612"
    },
    {
        "match": 57,
        "alliance": "B1",
        "team": "858"
    },
    {
        "match": 57,
        "alliance": "B2",
        "team": "894"
    },
    {
        "match": 57,
        "alliance": "B3",
        "team": "7769"
    },
    {
        "match": 58,
        "alliance": "R1",
        "team": "1918"
    },
    {
        "match": 58,
        "alliance": "R2",
        "team": "3602"
    },
    {
        "match": 58,
        "alliance": "R3",
        "team": "5498"
    },
    {
        "match": 58,
        "alliance": "B1",
        "team": "5675"
    },
    {
        "match": 58,
        "alliance": "B2",
        "team": "4776"
    },
    {
        "match": 58,
        "alliance": "B3",
        "team": "3175"
    },
    {
        "match": 59,
        "alliance": "R1",
        "team": "5509"
    },
    {
        "match": 59,
        "alliance": "R2",
        "team": "2960"
    },
    {
        "match": 59,
        "alliance": "R3",
        "team": "6861"
    },
    {
        "match": 59,
        "alliance": "B1",
        "team": "107"
    },
    {
        "match": 59,
        "alliance": "B2",
        "team": "5577"
    },
    {
        "match": 59,
        "alliance": "B3",
        "team": "5535"
    },
    {
        "match": 6,
        "alliance": "R1",
        "team": "6569"
    },
    {
        "match": 6,
        "alliance": "R2",
        "team": "8873"
    },
    {
        "match": 6,
        "alliance": "R3",
        "team": "3688"
    },
    {
        "match": 6,
        "alliance": "B1",
        "team": "6078"
    },
    {
        "match": 6,
        "alliance": "B2",
        "team": "5498"
    },
    {
        "match": 6,
        "alliance": "B3",
        "team": "5509"
    },
    {
        "match": 60,
        "alliance": "R1",
        "team": "818"
    },
    {
        "match": 60,
        "alliance": "R2",
        "team": "6090"
    },
    {
        "match": 60,
        "alliance": "R3",
        "team": "6087"
    },
    {
        "match": 60,
        "alliance": "B1",
        "team": "1023"
    },
    {
        "match": 60,
        "alliance": "B2",
        "team": "51"
    },
    {
        "match": 60,
        "alliance": "B3",
        "team": "8425"
    },
    {
        "match": 61,
        "alliance": "R1",
        "team": "3536"
    },
    {
        "match": 61,
        "alliance": "R2",
        "team": "1506"
    },
    {
        "match": 61,
        "alliance": "R3",
        "team": "5538"
    },
    {
        "match": 61,
        "alliance": "B1",
        "team": "2832"
    },
    {
        "match": 61,
        "alliance": "B2",
        "team": "858"
    },
    {
        "match": 61,
        "alliance": "B3",
        "team": "8873"
    },
    {
        "match": 62,
        "alliance": "R1",
        "team": "7769"
    },
    {
        "match": 62,
        "alliance": "R2",
        "team": "302"
    },
    {
        "match": 62,
        "alliance": "R3",
        "team": "3603"
    },
    {
        "match": 62,
        "alliance": "B1",
        "team": "6569"
    },
    {
        "match": 62,
        "alliance": "B2",
        "team": "5498"
    },
    {
        "match": 62,
        "alliance": "B3",
        "team": "3175"
    },
    {
        "match": 63,
        "alliance": "R1",
        "team": "107"
    },
    {
        "match": 63,
        "alliance": "R2",
        "team": "894"
    },
    {
        "match": 63,
        "alliance": "R3",
        "team": "7660"
    },
    {
        "match": 63,
        "alliance": "B1",
        "team": "503"
    },
    {
        "match": 63,
        "alliance": "B2",
        "team": "4381"
    },
    {
        "match": 63,
        "alliance": "B3",
        "team": "1918"
    },
    {
        "match": 64,
        "alliance": "R1",
        "team": "573"
    },
    {
        "match": 64,
        "alliance": "R2",
        "team": "2960"
    },
    {
        "match": 64,
        "alliance": "R3",
        "team": "2767"
    },
    {
        "match": 64,
        "alliance": "B1",
        "team": "6861"
    },
    {
        "match": 64,
        "alliance": "B2",
        "team": "5612"
    },
    {
        "match": 64,
        "alliance": "B3",
        "team": "818"
    },
    {
        "match": 65,
        "alliance": "R1",
        "team": "8425"
    },
    {
        "match": 65,
        "alliance": "R2",
        "team": "6087"
    },
    {
        "match": 65,
        "alliance": "R3",
        "team": "226"
    },
    {
        "match": 65,
        "alliance": "B1",
        "team": "5535"
    },
    {
        "match": 65,
        "alliance": "B2",
        "team": "4776"
    },
    {
        "match": 65,
        "alliance": "B3",
        "team": "6078"
    },
    {
        "match": 66,
        "alliance": "R1",
        "team": "70"
    },
    {
        "match": 66,
        "alliance": "R2",
        "team": "5675"
    },
    {
        "match": 66,
        "alliance": "R3",
        "team": "5509"
    },
    {
        "match": 66,
        "alliance": "B1",
        "team": "51"
    },
    {
        "match": 66,
        "alliance": "B2",
        "team": "5577"
    },
    {
        "match": 66,
        "alliance": "B3",
        "team": "6090"
    },
    {
        "match": 67,
        "alliance": "R1",
        "team": "3602"
    },
    {
        "match": 67,
        "alliance": "R2",
        "team": "6122"
    },
    {
        "match": 67,
        "alliance": "R3",
        "team": "7769"
    },
    {
        "match": 67,
        "alliance": "B1",
        "team": "3688"
    },
    {
        "match": 67,
        "alliance": "B2",
        "team": "1023"
    },
    {
        "match": 67,
        "alliance": "B3",
        "team": "302"
    },
    {
        "match": 68,
        "alliance": "R1",
        "team": "5538"
    },
    {
        "match": 68,
        "alliance": "R2",
        "team": "503"
    },
    {
        "match": 68,
        "alliance": "R3",
        "team": "818"
    },
    {
        "match": 68,
        "alliance": "B1",
        "team": "6861"
    },
    {
        "match": 68,
        "alliance": "B2",
        "team": "2832"
    },
    {
        "match": 68,
        "alliance": "B3",
        "team": "7660"
    },
    {
        "match": 69,
        "alliance": "R1",
        "team": "3175"
    },
    {
        "match": 69,
        "alliance": "R2",
        "team": "573"
    },
    {
        "match": 69,
        "alliance": "R3",
        "team": "5612"
    },
    {
        "match": 69,
        "alliance": "B1",
        "team": "8873"
    },
    {
        "match": 69,
        "alliance": "B2",
        "team": "3536"
    },
    {
        "match": 69,
        "alliance": "B3",
        "team": "6087"
    },
    {
        "match": 7,
        "alliance": "R1",
        "team": "226"
    },
    {
        "match": 7,
        "alliance": "R2",
        "team": "3536"
    },
    {
        "match": 7,
        "alliance": "R3",
        "team": "858"
    },
    {
        "match": 7,
        "alliance": "B1",
        "team": "6087"
    },
    {
        "match": 7,
        "alliance": "B2",
        "team": "7769"
    },
    {
        "match": 7,
        "alliance": "B3",
        "team": "107"
    },
    {
        "match": 70,
        "alliance": "R1",
        "team": "6569"
    },
    {
        "match": 70,
        "alliance": "R2",
        "team": "4776"
    },
    {
        "match": 70,
        "alliance": "R3",
        "team": "5509"
    },
    {
        "match": 70,
        "alliance": "B1",
        "team": "51"
    },
    {
        "match": 70,
        "alliance": "B2",
        "team": "70"
    },
    {
        "match": 70,
        "alliance": "B3",
        "team": "2960"
    },
    {
        "match": 71,
        "alliance": "R1",
        "team": "1023"
    },
    {
        "match": 71,
        "alliance": "R2",
        "team": "107"
    },
    {
        "match": 71,
        "alliance": "R3",
        "team": "1506"
    },
    {
        "match": 71,
        "alliance": "B1",
        "team": "6122"
    },
    {
        "match": 71,
        "alliance": "B2",
        "team": "5498"
    },
    {
        "match": 71,
        "alliance": "B3",
        "team": "5675"
    },
    {
        "match": 72,
        "alliance": "R1",
        "team": "3602"
    },
    {
        "match": 72,
        "alliance": "R2",
        "team": "5577"
    },
    {
        "match": 72,
        "alliance": "R3",
        "team": "6078"
    },
    {
        "match": 72,
        "alliance": "B1",
        "team": "2767"
    },
    {
        "match": 72,
        "alliance": "B2",
        "team": "858"
    },
    {
        "match": 72,
        "alliance": "B3",
        "team": "8425"
    },
    {
        "match": 73,
        "alliance": "R1",
        "team": "5535"
    },
    {
        "match": 73,
        "alliance": "R2",
        "team": "3603"
    },
    {
        "match": 73,
        "alliance": "R3",
        "team": "6090"
    },
    {
        "match": 73,
        "alliance": "B1",
        "team": "3688"
    },
    {
        "match": 73,
        "alliance": "B2",
        "team": "4381"
    },
    {
        "match": 73,
        "alliance": "B3",
        "team": "226"
    },
    {
        "match": 74,
        "alliance": "R1",
        "team": "894"
    },
    {
        "match": 74,
        "alliance": "R2",
        "team": "3175"
    },
    {
        "match": 74,
        "alliance": "R3",
        "team": "503"
    },
    {
        "match": 74,
        "alliance": "B1",
        "team": "1918"
    },
    {
        "match": 74,
        "alliance": "B2",
        "team": "5509"
    },
    {
        "match": 74,
        "alliance": "B3",
        "team": "7769"
    },
    {
        "match": 75,
        "alliance": "R1",
        "team": "1506"
    },
    {
        "match": 75,
        "alliance": "R2",
        "team": "6087"
    },
    {
        "match": 75,
        "alliance": "R3",
        "team": "5675"
    },
    {
        "match": 75,
        "alliance": "B1",
        "team": "2960"
    },
    {
        "match": 75,
        "alliance": "B2",
        "team": "8873"
    },
    {
        "match": 75,
        "alliance": "B3",
        "team": "818"
    },
    {
        "match": 76,
        "alliance": "R1",
        "team": "8425"
    },
    {
        "match": 76,
        "alliance": "R2",
        "team": "5612"
    },
    {
        "match": 76,
        "alliance": "R3",
        "team": "5538"
    },
    {
        "match": 76,
        "alliance": "B1",
        "team": "573"
    },
    {
        "match": 76,
        "alliance": "B2",
        "team": "5577"
    },
    {
        "match": 76,
        "alliance": "B3",
        "team": "6122"
    },
    {
        "match": 77,
        "alliance": "R1",
        "team": "226"
    },
    {
        "match": 77,
        "alliance": "R2",
        "team": "70"
    },
    {
        "match": 77,
        "alliance": "R3",
        "team": "5535"
    },
    {
        "match": 77,
        "alliance": "B1",
        "team": "3602"
    },
    {
        "match": 77,
        "alliance": "B2",
        "team": "7660"
    },
    {
        "match": 77,
        "alliance": "B3",
        "team": "858"
    },
    {
        "match": 78,
        "alliance": "R1",
        "team": "302"
    },
    {
        "match": 78,
        "alliance": "R2",
        "team": "5498"
    },
    {
        "match": 78,
        "alliance": "R3",
        "team": "51"
    },
    {
        "match": 78,
        "alliance": "B1",
        "team": "6090"
    },
    {
        "match": 78,
        "alliance": "B2",
        "team": "3536"
    },
    {
        "match": 78,
        "alliance": "B3",
        "team": "2767"
    },
    {
        "match": 79,
        "alliance": "R1",
        "team": "1023"
    },
    {
        "match": 79,
        "alliance": "R2",
        "team": "6861"
    },
    {
        "match": 79,
        "alliance": "R3",
        "team": "6078"
    },
    {
        "match": 79,
        "alliance": "B1",
        "team": "4381"
    },
    {
        "match": 79,
        "alliance": "B2",
        "team": "6569"
    },
    {
        "match": 79,
        "alliance": "B3",
        "team": "894"
    },
    {
        "match": 8,
        "alliance": "R1",
        "team": "573"
    },
    {
        "match": 8,
        "alliance": "R2",
        "team": "503"
    },
    {
        "match": 8,
        "alliance": "R3",
        "team": "51"
    },
    {
        "match": 8,
        "alliance": "B1",
        "team": "3603"
    },
    {
        "match": 8,
        "alliance": "B2",
        "team": "818"
    },
    {
        "match": 8,
        "alliance": "B3",
        "team": "3175"
    },
    {
        "match": 80,
        "alliance": "R1",
        "team": "4776"
    },
    {
        "match": 80,
        "alliance": "R2",
        "team": "3603"
    },
    {
        "match": 80,
        "alliance": "R3",
        "team": "2832"
    },
    {
        "match": 80,
        "alliance": "B1",
        "team": "1918"
    },
    {
        "match": 80,
        "alliance": "B2",
        "team": "3688"
    },
    {
        "match": 80,
        "alliance": "B3",
        "team": "107"
    },
    {
        "match": 9,
        "alliance": "R1",
        "team": "302"
    },
    {
        "match": 9,
        "alliance": "R2",
        "team": "4776"
    },
    {
        "match": 9,
        "alliance": "R3",
        "team": "894"
    },
    {
        "match": 9,
        "alliance": "B1",
        "team": "1506"
    },
    {
        "match": 9,
        "alliance": "B2",
        "team": "6861"
    },
    {
        "match": 9,
        "alliance": "B3",
        "team": "5535"
    }
]

