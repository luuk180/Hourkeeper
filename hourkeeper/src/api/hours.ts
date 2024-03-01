import {SERVER_URL} from "./consts.ts";

export const useHours = async (year: string, month: string): Promise<Array<Hours>> => {
    const res = await fetch(SERVER_URL + "/daysworked/" + year + "/" + month, {
        credentials: "include",
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
    return await res.json() as Array<Hours>;
}