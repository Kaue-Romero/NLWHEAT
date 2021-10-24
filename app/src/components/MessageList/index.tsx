import React, { useEffect } from "react";
import { Container } from "./styles";
import MessageComponent from "../Message";
import { Message } from "../../../../web/src/types";
import { api } from "../../services/api";
import { io } from "socket.io-client";

let messageQueue: Message[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on("new_message", (newMessage) => {
	messageQueue.push(newMessage);
});

export default function MessageList() {
	const [currentMessages, setCurrentMessages] = React.useState<Message[]>([]);

	useEffect(() => {
		const timer = setInterval(() => {
			if (messageQueue.length > 0) {
				setCurrentMessages((prevState) => [
					messageQueue[0],
					prevState[0],
					prevState[1],
				]);
				messageQueue.shift();
			}
		}, 3000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		(async () => {
			const response = await api.get<Message[]>("/messages/last3");
			setCurrentMessages(response.data);
		})();
	}, []);

	return (
		<Container>
			{currentMessages.map((message) => (
				<MessageComponent key={message.id} data={message} />
			))}
		</Container>
	);
}
