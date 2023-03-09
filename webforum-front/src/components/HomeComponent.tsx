import {useNavigate} from "react-router-dom";
import React from "react";

export default function Home() {
    const navigate = useNavigate();
    return (<div>
        <button
            onClick={() => navigate('/signup')}>
            Регистрация
        </button>
        <button
            onClick={() => navigate('/login')}>
            Авторизация
        </button>
    </div>)
}
