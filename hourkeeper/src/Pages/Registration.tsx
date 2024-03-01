import Navbar from "../Components/Navbar.tsx";
import React, {useState} from "react";
import {getRegistered} from "../api/auth";
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [feedback, setFeedback] = useState("");

    const timedFeedback = (text: string) => {
        setFeedback(text);
        setTimeout(() => setFeedback(""), 1500);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        void getRegistered(email, password).then(
            u => {
                if(u)
                    {setTimeout(() => navigate("/login"), 1500);}
                else{timedFeedback("Can't register!")}})
            .catch(e => timedFeedback(JSON.stringify(e)));
        return;
    }
    return <>
        <Navbar />
        <div className={"container"}>
            <h1 className={"title"}>Register</h1>
            <form className={"control column is-3 box"} onSubmit={handleSubmit}>
                <div className={"field"}>
                    <label>Email:</label>
                    <input className={"input"} value={email} type={"email"} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className={"field"}>
                    <label>Password:</label>
                    <input className={"input"} value={password} type={"password"}
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className={"button is-primary"} type={"submit"}>Submit</button>
            </form>
            {feedback != null  && feedback != "" ? <span className={"notification"}>{feedback}</span> : ""}
        </div>
    </>
}

export default Registration;