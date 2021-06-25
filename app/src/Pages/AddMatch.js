import {useEffect, useState} from "react";
import Server from "../utils/Server";
import { Redirect } from 'react-router-dom'

export default function AddMatch() {
    const [teams, setTeams] = useState([]);

    const [teamA, setTeamA] = useState(0);
    const [teamB, setTeamB] = useState(0);

    const [date, setDate] = useState(0);
    const [city, setCity] = useState('');

    const [done, setDone] = useState(false);

    const [teamValidate, setTeamValidate] = useState(true);

    function onTeamASelect(e) {
        let team = e.target.value;
        setTeamA(team);
        setTeamValidate(team !== teamB);
    }

    function onTeamBSelect(e) {
        let team = e.target.value;
        setTeamB(team);
        setTeamValidate(team !== teamA);
    }

    useEffect(() => {
        Server
            .get(`/team`)
            .then(res => {
                setTeams(res.data["teams"])
                setTeamA(res.data["teams"][0]["_id"])
                setTeamB(res.data["teams"][1]["_id"])
            })
            .catch(err => console.log("error"));
    }, []);

    function addMatch() {
        Server
            .post(`/match`, {
                "teamA": teamA,
                "teamB": teamB,
                "date": date,
                "city": city
            })
            .then(res => {
                setDone(true)
            })
            .catch(err => console.log("error"))
    }

    function onCityValue(e) {
        let city = e.target.value;
        setCity(city);
    }

    function onDate(e) {
        let date = e.target.value;
        setDate(date);
    }

    return (
        <div className={`mt-8 flex flex-col items-center`}>
            {done &&  <Redirect to='/'/>}
            <p className={`text-2xl font-bold mb-4`}>Add New Match</p>
            {!teamValidate && <p className={`text-red-600`}>Teams must not be same!</p>}
            <div className={`flex items-center justify-center space-x-4`}>
                <select className={`rounded-md`} onChange={onTeamASelect}>
                    {teams.map(team =>
                        <option key={team._id} value={team._id}>{team.name}</option>
                    )}
                </select>
                <p>VS</p>
                <select className={`rounded-md`} onChange={onTeamBSelect}>
                    {teams.map(team =>
                        <option key={team._id} value={team._id}>{team.name}</option>
                    )}
                </select>
            </div>
            <div className={`mt-4`}>
                <label>
                    Date
                    <input onChange={onDate} value={date} className={`ml-2 rounded-md`} type="date"/>
                </label>
            </div>
            <div className={`mt-4`}>
                <label>
                    City
                    <input onChange={onCityValue} value={city} className={`ml-2 rounded-md`} type="text"/>
                </label>
            </div>
            <button onClick={addMatch} className={`bg-indigo-300 px-4 py-2 rounded-md mt-8`}>Add</button>
        </div>
    );
}
