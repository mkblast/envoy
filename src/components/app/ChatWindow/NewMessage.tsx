import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Message } from "../../../types";
import Styles from "./NewMessage.module.css";

type NewMessageProps = {
    id: string | undefined;
    token: string;
    setMessages: Dispatch<SetStateAction<Message[] | null>>;
}

function NewMessage(
    { id, token, setMessages }: NewMessageProps
) {
    const [message, setMessage] = useState("");
    const API_URI = import.meta.env.VITE_API_URI;

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setMessage(e.target.value);
    }

    async function handleSubmit() {
        const res = await fetch(`${API_URI}/api/users/${id}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify({
                message
            })
        });

        const json = await res.json();
        const newMessage: Message = json.message;

        setMessages(prev => [...prev!, newMessage]);
        setMessage("");
    }

    return (
        id ?
            <form className={Styles.form} onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}>
                <input type="text" required onChange={handleChange} value={message} />
                <button>Send</button>
            </form>
            :
            <></>
    );
}

export default NewMessage;
