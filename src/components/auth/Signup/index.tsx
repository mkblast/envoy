import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputError } from "../../../types";
import Styles from "./index.module.css";

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<InputError[] | null>(null);
    const navigate = useNavigate();
    const API_URI = import.meta.env.VITE_API_URI;

    useEffect(() => {
        if (password !== confirmPassword) {
            return setErrors([{ path: "confirm password", msg: "Passwords: Does not match." }]);
        }

        setErrors([]);
    }, [confirmPassword, password]);

    function handleChange(
        value: string,
        setFunction: React.Dispatch<React.SetStateAction<string>>
    ): void {
        return setFunction(value);
    }

    async function handleSubmit() {
        const res = await fetch(`${API_URI}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            })
        });

        const json = await res.json();

        if (res.ok) {
            return navigate("/auth/login");
        }

        const errors: InputError[] = json.errors;

        return setErrors(errors);
    }

    function isValidInputs(): boolean {
        return (firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            password !== "" &&
            confirmPassword !== "" &&
            errors !== null &&
            errors.length === 0
        );
    }

    return (
        <form className={Styles.form} onSubmit={e => {
            e.preventDefault();
            handleSubmit();
        }}>
            <h1>Envoy</h1>
            <div className={Styles.information}>
                <input className={Styles.inputs} type="text"
                    placeholder="First name"
                    aria-placeholder="First name"
                    name="first_name"
                    value={firstName}
                    onChange={e => handleChange(e.target.value, setFirstName)}
                    required
                />
                <input className={Styles.inputs} type="text"
                    placeholder="Last name"
                    aria-placeholder="Last name"
                    name="last_name"
                    value={lastName}
                    onChange={e => handleChange(e.target.value, setLastName)}
                    required
                />
                <input className={Styles.inputs} type="email"
                    placeholder="Email"
                    aria-placeholder="Email"
                    name="email"
                    value={email}
                    onChange={e => handleChange(e.target.value, setEmail)}
                    required
                />
                <input className={Styles.inputs} type="password"
                    placeholder="Password"
                    aria-placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => handleChange(e.target.value, setPassword)}
                    required
                />
                <input className={Styles.inputs} type="password"
                    placeholder="Confirm password"
                    aria-placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={e => handleChange(e.target.value, setConfirmPassword)}
                    required
                />
            </div>
            <button disabled={!isValidInputs()} className={Styles.submit}>
                Sign Up
            </button>
            <div className={Styles.errors}>
                {errors !== null && errors!.length !== 0 ?
                    errors?.map(err =>
                        <p key={err.path}>{err.msg}</p>
                    )
                    :
                    <></>
                }
            </div>
            <h3>Already have an account? <Link className={Styles.redirect} to="/auth/login">Log in</Link></h3>
        </form>
    );
}

export default Signup;
