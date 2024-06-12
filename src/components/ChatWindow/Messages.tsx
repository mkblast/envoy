import { Message } from "../../types";

type MessagesProps = {
    messages: Message[] | null,
    id: string
}

function Messages(
    { messages, id }: MessagesProps,
) {
    return (
        <>
            {messages ?
                messages.length !== 0 ?
                    messages.map(message => (
                        message.reciever._id === id ?
                            <div className="reciever" key={message._id}>
                                <p>
                                    {`${message.author.first_name} ${message.author.last_name}: ${message.body}`}
                                </p>
                            </div>
                            :
                            <div className="me" key={message._id}>
                                <p>
                                    {`${message.author.first_name} ${message.author.last_name}: ${message.body}`}
                                </p>
                            </div>
                    ))
                    :
                    <h2>Start a new conversation.</h2>
                :
                <h2>Loading</h2>
            }
        </>
    );
}

export default Messages;
