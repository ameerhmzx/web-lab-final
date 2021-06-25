import {useState} from "react";
import Server from "../utils/Server";
import {Redirect} from "react-router-dom";

export default function LoginPage(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [done, setDone] = useState(false);

    function login() {
        Server.post(`user/login`, {
            username, password
        }).then(res => {
            sessionStorage.setItem('jwtToken', res.data["token"]);
            setDone(true);
        });
    }

    function register() {
        Server.post(`user/register`, {
            username, password
        }).then(res => {
            sessionStorage.setItem('jwtToken', res.data["token"]);
            setDone(true);
        });
    }

    function onUsernameChange(e) {
        setUsername(e.target.value);
    }

    function onPasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <div className={`flex items-center bg-indigo-50 justify-center w-full h-full min-h-screen`}>
            {done &&  <Redirect to='/admin'/>}
            <div className={`flex items-center flex-col bg-white p-8 rounded-md shadow-md`}>
                <label className={`mb-2`}>
                    Username
                    <input onChange={onUsernameChange} value={username} className={`rounded-md ml-2`} type="text"/>
                </label>

                <label>
                    Password
                    <input onChange={onPasswordChange} value={password} className={`rounded-md ml-2`} type="password"/>
                </label>
                <div className={`flex items-center justify-center space-x-2 mt-4`}>
                    <button className={`bg-indigo-200 px-4 py-2 rounded-md mt-2`} onClick={login}>
                        Login
                    </button>

                    <p>or</p>

                    <button className={`bg-indigo-200 px-4 py-2 rounded-md mt-2`} onClick={register}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}
