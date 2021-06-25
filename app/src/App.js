import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AddMatch from "./Pages/AddMatch";
import LoginPage from "./Pages/LoginPage";
import {checkAuth} from "./utils/Auth";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/admin">
                    {checkAuth() ?
                        <AddMatch/>
                        : <LoginPage/>
                    }
                </Route>
                <Route path="/">
                    <HomePage/>
                </Route>
            </Switch>
        </Router>
    );
}
