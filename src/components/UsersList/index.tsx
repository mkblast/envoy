import { useEffect, useState } from "react";
import { User } from "../../types";
import { Link } from "react-router-dom";
import Styles from "./index.module.css";

type UsersListProps = {
    token: string,
}

function UsersList(
    { token }: UsersListProps
) {
    const [users, setUsers] = useState<User[] | null>(null);
    const API_URI = import.meta.env.VITE_API_URI;

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_URI}/api/users`, {
                method: "GET",
                headers: {
                    "Authorization": `bearer ${token!}`
                }
            });
            const json = await res.json();

            setUsers(json.users);
        })();
    }, [API_URI, token]);


    return (
        users ?
            users.length !== 0 ?
                users.map(user => (
                    <Link to={`/m/${user._id}`} key={user._id} className={Styles.user} >
                        <p>{user.first_name} {user.last_name}</p>
                    </Link>
                ))
                :
                <div>
                    <h2>No users.</h2>
                    <p>Invite some friends.</p>
                </div>
            :
            <div>
                <h2>Loading</h2>
            </div>
    );
}

export default UsersList;
