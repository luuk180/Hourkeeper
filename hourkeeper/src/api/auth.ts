import {SERVER_URL} from "./consts.ts";

export async function getRegistered(email: string, password: string): Promise<boolean> {
    const res = await fetch(SERVER_URL + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: (JSON.stringify({
            email: email,
            password: password
        }))
    });
    return res.ok;
}
export async function useUser(email: string, password: string): Promise<boolean> {
    const res = await fetch(SERVER_URL + "/login/?useCookies=true", {
        credentials: "include",
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: (JSON.stringify({
            email: email,
            password: password
        }))
    });
    return res.status === 200;

}