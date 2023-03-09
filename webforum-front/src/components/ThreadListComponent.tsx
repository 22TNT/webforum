import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {url} from "../queries";


export default function ThreadList() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies<any>(['jwt']);
    const [user, setUser] = useState("");
    const [posts, setPosts] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");

    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) { // @ts-ignore
            return parts.pop().split(';').shift();
        }
    }

    useEffect(() => {
        const verifyUser = () => {
            if (!getCookie("jwt")) {
                navigate("/");
            }
            else {
                let cookie = getCookie("jwt");
                console.log(JSON.stringify(cookie));
                let base64Url = JSON.stringify(cookie).split('.')[1];
                console.log(JSON.stringify(base64Url));
                let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                let json = JSON.parse(jsonPayload);
                console.log(json);
                setUser(json["id"]);
                console.log("user = "+user);
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);


    const postsRequest = async () => {
        const responce = await fetch(`${url}/thread/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const result = await responce.json();
        setPosts(result);
    };


    const onSubmit = (search: string) => {
        postsRequest();
        console.log(search);
    }

    async function postMessage(user: string, message: string) {
        const body = JSON.stringify({message: message, from: user});
        console.log(body);
        const responce = await fetch(`${url}/thread/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body,
        });
    }

    async function onCreate(message: string) {
        await postMessage(user, message);
    }

    useEffect(() => {
        postsRequest();
    }, []);

    function getSearched() {
        return posts.filter(post => post?.message.includes(search));
    }

    return (
        <>
            <div>
                <>
                <h2>Форум</h2>
                    <input type={"text"} value={search} onChange={(e) => setSearch(search => e.target.value)}/>
                <br/>
                    <br/>
                <div>
                    {getSearched().map(post => <div>
                        <b>{post?.message}</b>
                        <br/>
                        {post?.from?.login};
                        <br/>
                        <br/>
                    </div>)}
                </div>
                    <br/><br/>
                    <form onSubmit={(e) => onCreate(message)}>
                    <input type="text" value={message} onChange={(e) => setMessage(message => e.target.value)}/>
                    <button type={"submit"}>Add</button>
                    </form>
                </>
            </div>
        </>
    )
}
