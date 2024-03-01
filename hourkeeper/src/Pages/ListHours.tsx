import {useEffect, useState} from "react";
import {useHours} from "../api/hours.ts";

const ListHours = () => {
    const [hours, setHours] = useState<Array<Hours>>();
    const getHours = useHours("2024", "1");

    useEffect(() => {
        getHours
            .then(e => setHours(e))
            .catch(console.log);
    }, []);

    return <>{hours != null ? hours.map(hour => (
        <>{hour.hours.toString()} for the day: {hour.date}</>
    )) : <>Hours not yet filled!</>}</>
}

export default ListHours;