import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";
import { api } from "../../services/api";
import { useState, useEffect } from "react";
import { Message } from "../../types";
import io from "socket.io-client";

const socket = io("http://localhost:4000");
const messagesQueue: Message[] = [];
socket.on("new_message", (message: Message) => {
    messagesQueue.push(message);
});

export function MessageList() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        setInterval(() => {
            if (messagesQueue.length > 0) {
                setMessages((oldArray) =>
                    [messagesQueue[0], oldArray[0], oldArray[1]].filter(Boolean)
                );
                messagesQueue.shift();
            }
        }, 3000);
    }, []);

    useEffect(() => {
        api.get<Message[]>("messages/last3").then((res) => {
            const data = res.data;
            setMessages(data);
        });
    }, []);

    

    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile 2021" />

            <ul className={styles.messageList}>
                {messages.map((message: Message) => (
                    <li key={message.id} className={styles.message} >
                        <p className={styles.messageContent}>
                            "{message.text}"
                        </p>
                        <div className={styles.messageUser}>
                            <div className={styles.userImage}>
                                <img
                                    src={message.user.avatar_url}
                                    alt="Avatar do usuario"
                                />
                            </div>
                            <span>{message.user.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
