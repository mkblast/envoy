import { useParams } from "react-router-dom";
import { Message } from "../../../types";
import { useEffect, useState } from "react";
import NewMessage from "./NewMessage";
import Messages from "./Messages";
import Styles from "./index.module.css";

function ChatWindow() {
    const [messages, setMessages] = useState<Message[] | null>(null);
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const API_URI = import.meta.env.VITE_API_URI;

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_URI}/api/users/${id}/messages`, {
                method: "GET",
                headers: {
                    "Authorization": `bearer ${token}`
                }
            });

            const json = await res.json();

            setMessages(json.messages);
        })();

        return () => setMessages(null);
    }, [API_URI, id, token]);

    return (
        <div className={Styles.window}>
            <Messages messages={messages} id={id!} />
            <NewMessage id={id} setMessages={setMessages} token={token!} />
        </div>
    );
}

export default ChatWindow;
