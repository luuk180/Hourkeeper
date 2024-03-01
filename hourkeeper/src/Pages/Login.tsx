import {useState} from "react";
import {useUser} from "../api/auth.ts";
import Navbar from "../Components/Navbar.tsx";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState("");

    const timedFeedback = (text: string) => {
        setFeedback(text);
        setTimeout(() => setFeedback(""), 1500);
    }

    const GetLoggedIn = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        useUser(email, password)
        .then((u) => {
            u ?
                (timedFeedback("Successful sign in!"),
                    setTimeout(() => navigate("/"), 1500))
                : timedFeedback("Can't login, please try again.")
        }).catch(e => timedFeedback(JSON.stringify(e)));
    }

    return <>
        <Navbar />
        <div className={"container"}>
            <h1 className={"title"}>Login</h1>
            <form className={"control column is-3 box"} onSubmit={GetLoggedIn}>
                <div className={"field"}>
                    <label>Email:</label>
                    <input className={"input"} value={email} type={"email"} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={"field"}>
                    <label>Password:</label>
                    <input className={"input"} value={password} type={"password"} onChange={e => setPassword(e.target.value)} />
                </div>
                <button className={"button is-primary"} type={"submit"}>Submit</button>
            </form>
            {feedback != null  && feedback != "" ? <span className={"notification"}>{feedback}</span> : ""}
        </div>
    </>
}

export default Login;