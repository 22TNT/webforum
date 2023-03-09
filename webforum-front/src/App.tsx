import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
    useParams,
    useNavigate,
} from "react-router-dom";

import './App.css';
import Signup from "./components/RegistrationForm";
import Login from "./components/LoginForm";
import Home from "./components/HomeComponent";
import ThreadList from "./components/ThreadListComponent";

const url = "http://localhost:3001";

function CreateThread() {
    return <>ThreadNew</>
}

function Thread() {
    return <>Thread {useParams()}</>
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/threads"} element={<ThreadList/>}/>
                <Route path={"/signup"} element={<Signup/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/thread/:id"} element={<Thread/>}/>
                <Route path={"*"} element={<Navigate to={"/"} replace/>}/>
            </Routes>
        </Router>
    );
}

export default App;
