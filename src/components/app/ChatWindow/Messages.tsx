import { Message } from "../../../types";
import Styles from "./Messages.module.css";

type MessagesProps = {
    messages: Message[] | null,
    id: string
}

function convertISOToTime(isoString: string): string {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function Messages(
    { messages, id }: MessagesProps,
) {
    return (
        <div className={Styles.messages}>
            {messages ?
                messages.length !== 0 ?
                    messages.map(message => (
                        message.reciever._id === id ?
                            <div className={`${Styles.message} ${Styles.me}`} key={message._id}>
                                <p>{message.body}</p>
                                <p className={Styles.date_me}>
                                    {convertISOToTime(message.date)}
                                </p>
                            </div>
                            :
                            <div className={`${Styles.message} ${Styles.reciever}`} key={message._id}>
                                <p>{message.body}</p>
                                <p className={Styles.date_res}>
                                    {convertISOToTime(message.date)}
                                </p>
                            </div>
                    ))
                    :
                    <h2 className={Styles.state}>Start a new conversation.</h2>
                :
                <h2 className={Styles.state}>Loading</h2>
            }
        </div>
    );
}

export default Messages;
