import React from 'react'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import Config from '../utils/config.json'
import { Typography } from '@mui/material'

export default function TBALoader() {
    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(localStorage.getItem("matches") === null || localStorage.getItem("event_code") !== Config.tba_eventid ? false : true)
    const [teams, loadTeams] = React.useState(localStorage.getItem("matches") === null || localStorage.getItem("event_code") !== Config.tba_eventid ? "" : "Teams Already Loaded")
    const [matches, loadMatches] = React.useState(localStorage.getItem("matches") === null || localStorage.getItem("event_code") !== Config.tba_eventid ? "" : "Matches Already Loaded")

    async function handleClick() {
        if (localStorage.getItem("matches") === null || localStorage.getItem("matches") === "[]") {
            setLoading(true)
            let config = {
                headers: {
                "Content-Type": "application/json",
                "X-TBA-Auth-Key": Config.tba_key,
                },
            };
            const url = `https://www.thebluealliance.com/api/v3/event/${Config.tba_eventid}/teams/simple` 
            
            await axios.get(url, config).catch((err) => {
                console.log("Error: ", err)
                loadTeams("Error Loading ❌")

            }).then((response) => {
                localStorage.setItem("teams", JSON.stringify(response.data))
                loadTeams("Loaded ✅")
                loadMatch();
                setLoading(false)
                setDisabled(true)
            })
        } else {
            setDisabled(true)
            loadTeams("Teams Already Loaded")
        }
    }

    async function loadMatch() {
        if (localStorage.getItem("event_code") !== null || localStorage.getItem("event_code") !== Config.tba_eventid) {
            setLoading(true)
            let config = {
                headers: {
                "Content-Type": "application/json",
                "X-TBA-Auth-Key": Config.tba_key,
                },
            };
            const url = `https://www.thebluealliance.com/api/v3/event/${Config.tba_eventid}/matches/simple` 
            
            await axios.get(url, config).catch((err) => {
                console.log("Error: ", err)
                loadMatches("Error Loading ❌")

            }).then((response) => {
                console.log(response.data)
                const filtered = response.data.filter((match) => match.comp_level === "qm")
                var reformatted = []
                for (let i = 0; i < filtered.length; i++) {
                    for (let j = 0; j < filtered[i].alliances.red.team_keys.length; j++) {
                        var result = JSON.parse(localStorage.getItem("teams")).filter(x => x.key === filtered[i].alliances.red.team_keys[j]);
                        let team = result[0].team_number + " " + result[0].nickname
                        reformatted.push({
                            match: filtered[i].match_number,
                            team: team,
                            alliance: "R" + (j + 1),
                        })
                    }
                    for (let j = 0; j < filtered[i].alliances.blue.team_keys.length; j++) { 
                        var res = JSON.parse(localStorage.getItem("teams")).filter(x => x.key === filtered[i].alliances.blue.team_keys[j]);
                        let team = res[0].team_number + " " + res[0].nickname
                        reformatted.push({
                            match: filtered[i].match_number,
                            team: team,
                            alliance: "B" + (j + 1),
                        })
                    }
                }
                localStorage.setItem("matches", JSON.stringify(reformatted))
                localStorage.setItem("event_code", Config.tba_eventid)
                localStorage.removeItem("teams")
                loadMatches("Loaded ✅")
                setLoading(false)
                setDisabled(true)
            })
        } else {
            setDisabled(true)
            loadMatches("Matches Already Loaded")
        }
    }

    return (
        <div>
            <LoadingButton loading={loading} disabled={disabled} onClick={handleClick} variant="contained">
                   Load Event
            </LoadingButton>
            <br />
            <Typography variant="p" style={{ fontWeight: "bold" }}>
                Teams Loaded: {teams}
            </Typography>
            <br />
            <Typography variant="p" style={{ fontWeight: "bold" }}>
                Matches Loaded: {matches}
            </Typography>
        </div>
  )
}
