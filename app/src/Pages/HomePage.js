import {useEffect, useState} from "react";
import Server from "../utils/Server";
import {Link} from "react-router-dom";

export default function HomePage(props) {

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        Server
            .get(`/match`)
            .then(res => {
                setMatches(res.data["matches"])
            })
            .catch(err => {
            })
    }, []);

    return (<div className={`flex flex-col items-center justify-center`}>
        <p className={`text-2xl mb-4`}>Match Lists</p>
        {
            matches.map((match) =>
                <div className={`mb-2`} key={match._id}>
                <div className={`flex items-center space-x-4`}>
                    <div>{match["teamA"]["name"]}</div>
                    <div> vs </div>
                    <div>{match["teamB"]["name"]}</div>
                </div>
                    <p>Date: {match["date"]}</p>
                    <p>City: {match["city"]}</p>
                    <hr/>
                </div>)
        }
        <Link to={'/admin'} className={`bg-indigo-500 text-white px-4 py-2 rounded-md mt-8`}>Add New Match</Link>
    </div>);
}
