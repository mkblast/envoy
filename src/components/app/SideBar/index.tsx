import { Link } from "react-router-dom";
import Styles from "./index.module.css";
import { useEffect, useState } from "react";
import { User } from "../../../types";

function SideBar() {
    const [user, setUser] = useState<User | null>(null);
    const API_URI = import.meta.env.VITE_API_URI;
    const token = localStorage.getItem("token");

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_URI}/api/me`, {
                headers: {
                    "Authorization": `bearer ${token}`
                }
            });
            const json = await res.json();

            const user = json.me;

            console.log(json, user);

            setUser(user);
        })();
    }, [API_URI, token]);

    return (
        <div className={Styles.container}>
            <Link className={Styles.link} to={`/u/${user?._id}`}><span className="material-icons" title="Profile">person</span></Link>
            <Link className={Styles.link} to={"/auth/logout"}><span className="material-icons" title="Log out">logout</span></Link>
        </div>
    );
}

export default SideBar;
