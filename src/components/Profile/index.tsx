import Styles from "./index.module.css";
import { useEffect, useState } from "react";
import { InputError, User } from "../../types";

function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [errors, setErrors] = useState<InputError[] | null>(null);
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

            setUser(user);
        })();
    }, [API_URI, token]);

    async function handleSubmit() {
        const res = await fetch(`${API_URI}/api/me`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify({
                first_name: user?.first_name,
                last_name: user?.last_name,
                email: user?.email,
            })
        });

        const json = await res.json();

        if (res.ok) {
            return;
        }

        const errors: InputError[] = json.errors;
        setErrors(errors);
    }

    return (
        user ?
            <form className={Styles.container} onSubmit={e => {
                e.preventDefault();
            }}>
                <div className={Styles.information}>
                    <input className={Styles.inputs} type="text" value={user?.first_name} required onChange={e => {
                        setUser(prev => ({ ...prev!, first_name: e.target.value }));
                    }}
                    />

                    <input className={Styles.inputs} type="text" value={user?.last_name} required onChange={e => {
                        setUser(prev => ({ ...prev!, last_name: e.target.value }));
                    }} />

                    <input className={Styles.inputs} type="email" value={user?.email} required onChange={e => {
                        setUser(prev => ({ ...prev!, email: e.target.value }));
                    }} />

                </div>

                <button className={Styles.submit} onClick={handleSubmit}>Update</button>

                <div className={Styles.errors}>
                    {errors !== null && errors.length !== 0 ?
                        errors.map(err =>
                            <p key={err.path}>{err.msg}</p>
                        )
                        :
                        <></>
                    }
                </div>
            </form>
            :
            <></>
    );
}

export default Profile;
