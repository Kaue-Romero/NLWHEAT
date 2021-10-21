import { FormEvent, useContext, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { AuthContext } from "../../context/auth";
import { api } from "../../services/api";
import styles from "./styles.module.scss";



export function SendMessageForm() {
    const { user, signOut } = useContext(AuthContext);
    const [message, setMessage] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!message.trim()) return;

        await api.post("/messages", {
            message,
        });

        setMessage("");
    }

    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size={32} />
            </button>

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt="User" />
                </div>
                <strong>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size={16} />
                    {user?.login}
                </span>
            </header>

            <form onSubmit={handleSubmit} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="message"
                    placeholder="Qual sua expectativa para o evento?"
                />
                <button type="submit">Enviar mensagem</button>
            </form>
        </div>
    );
}
