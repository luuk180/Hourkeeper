import {useState} from "react";


const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const registration = () => {
    function submit(){

    }
    return <>
        <form onSubmit={submit}>
            <input onChange={setEmail} type={"text"} id={"email"}></input>
            <input type={"password"} id={"password"}></input>
            <button type={"submit"}>Submit</button>
        </form>
    </>
}

export default registration;